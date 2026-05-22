import UsuariosPermitidosModel from '../models/UsuariosPermitidosModel.js';
import * as xlsx from 'xlsx';

// Sube un archivo Excel y actualiza la lista de usuarios permitidos
export const importUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    // Leer el archivo desde memoria o desde donde lo haya subido multer
    // Asumimos que se usa multer en memoria (memoryStorage) o diskStorage
    let workbook;
    if (req.file.buffer) {
      workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    } else {
      workbook = xlsx.readFile(req.file.path);
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (data.length === 0) {
      return res.status(400).json({ message: 'El archivo está vacío' });
    }

    let importedCount = 0;

    for (const row of data) {
      // Necesitamos extraer el documento. Validemos diferentes posibles nombres de columna
      const documento = row['Documento'] || row['documento'] || row['DOCUMENTO'];
      if (!documento) continue;

      const nombres_apellidos = row['Nombres'] || row['nombres'] || row['NOMBRES'] || row['Nombres_Apellidos'] || null;
      const email = row['Email'] || row['email'] || row['EMAIL'] || row['Correo'] || null;

      // Usar upsert o findOrCreate
      const [user, created] = await UsuariosPermitidosModel.findOrCreate({
        where: { documento: String(documento) },
        defaults: {
          nombres_apellidos: nombres_apellidos,
          email: email
        }
      });

      if (!created) {
        // Actualizar datos si ya existía
        await user.update({
          nombres_apellidos: nombres_apellidos || user.nombres_apellidos,
          email: email || user.email
        });
      }

      importedCount++;
    }

    res.status(200).json({ 
      message: `Se han importado/actualizado ${importedCount} usuarios permitidos.`,
      importedCount
    });

  } catch (error) {
    console.error('Error importando usuarios:', error);
    res.status(500).json({ message: 'Error interno al importar los usuarios', error: error.message });
  }
};
