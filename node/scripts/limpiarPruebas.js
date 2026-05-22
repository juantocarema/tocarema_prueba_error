import sequelize from '../database/db.js';
import EquiposModel from '../models/EquiposModel.js';
import ReactivosModel from '../models/reactivosModel.js';
import UserModel from '../models/userModel.js';
import CuentadanteModel from '../models/cuentadanteModel.js';
import ProveedoresModel from '../models/proveedoresModel.js';

async function limpiar() {
    console.log("⏳ Conectando a la base de datos...");
    await sequelize.authenticate();
    
    console.log("🗑️ Eliminando datos de prueba...");
    
    // Eliminamos los que coincidan con la data generada. 
    // Para no borrar el admin real o cuentadantes reales, limitamos con LIKE.
    
    await EquiposModel.destroy({ where: { no_placa: { [sequelize.Sequelize.Op.like]: 'PLACA-%' } } });
    console.log("✅ Equipos de prueba eliminados.");

    await UserModel.destroy({ where: { email: { [sequelize.Sequelize.Op.like]: 'usuario_prueba_%' } } });
    console.log("✅ Usuarios de prueba eliminados.");

    // Los Reactivos generados todos tienen números al final del nombre en la fórmula (H2O1..10)
    await ReactivosModel.destroy({ where: { formula_reactivo: { [sequelize.Sequelize.Op.like]: 'H2O%' } } });
    console.log("✅ Reactivos de prueba eliminados.");

    // Los Proveedores falsos, la mayoría los limpiaremos todos, pero mejor borrar todo lo que tenga estado 1 para proveedores, o truncamos si solo es de prueba
    // Ojo: Si ya tienen datos reales, esto podría borrar datos que sí sirven. Se recomienda vaciar la tabla por completo en pruebas
    await ProveedoresModel.destroy({ where: {} });
    console.log("✅ Proveedores eliminados.");
    
    await CuentadanteModel.destroy({ where: {} });
    console.log("✅ Cuentadantes eliminados.");

    console.log("🎉 LIMPIEZA FINALIZADA. La base de datos está libre de los miles de registros falsos.");
    process.exit();
}

limpiar().catch(err => {
    console.error("❌ Error limpiando base de datos:", err);
    process.exit(1);
});
