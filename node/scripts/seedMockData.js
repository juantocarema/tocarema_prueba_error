import { fakerES as faker } from '@faker-js/faker';
import sequelize from '../database/db.js';
import EquiposModel from '../models/EquiposModel.js';
import ReactivosModel from '../models/reactivosModel.js';
import UserModel from '../models/userModel.js';
import CuentadanteModel from '../models/cuentadanteModel.js';
import ProveedoresModel from '../models/proveedoresModel.js';
import bcrypt from 'bcrypt';

async function seed() {
    console.log("⏳ Conectando a la base de datos...");
    await sequelize.authenticate();
    console.log("✅ Conexión establecida.");

    const cantidad = 1000;

    // 1. Crear 1000 Cuentadantes
    console.log(`⏳ Generando ${cantidad} Cuentadantes...`);
    const cuentadantes = [];
    for (let i = 0; i < cantidad; i++) {
        cuentadantes.push({
            nom_cuentadante: faker.person.firstName(),
            apell_cuentadante: faker.person.lastName(),
            tel_cuentadante: faker.phone.number({ style: 'national' }),
            estado: 'activo'
        });
    }
    await CuentadanteModel.bulkCreate(cuentadantes);
    console.log(`✅ ${cantidad} Cuentadantes creados.`);

    // 2. Crear 1000 Proveedores
    console.log(`⏳ Generando ${cantidad} Proveedores...`);
    const proveedores = [];
    for (let i = 0; i < cantidad; i++) {
        proveedores.push({
            nom_proveedor: faker.company.name(),
            apel_proveedor: faker.person.lastName(),
            tel_proveedor: faker.phone.number({ style: 'national' }),
            dir_proveedor: faker.location.streetAddress(),
            estado: 1
        });
    }
    await ProveedoresModel.bulkCreate(proveedores);
    console.log(`✅ ${cantidad} Proveedores creados.`);

    // 3. Crear 1000 Reactivos
    console.log(`⏳ Generando ${cantidad} Reactivos...`);
    const reactivos = [];
    const presentaciones = ["kilogramos", "gramos", "litros", "sobres"];
    const coloresAlmacenamiento = ["Peligro para la salud", "Inflamabilidad", "N/A", "Peligro de contacto", "Riesgo minimo", "Riesgo de reactividad", "Preparados"];
    const coloresStand = ["Morado", "Negro", "Agua marina", "Rosado", "Fucsia", "Gris claro", "Ciruela", "Purpura", "Marron", "Gris oscuro", "Cafe"];
    const clasificaciones = ['Peligro de contacto', 'Peligro de reactividad', 'Peligro de inflamabilidad', 'Riesgo minimo', 'Peligro para salud', 'Evalué el almacenamiento individualmente'];
    
    for (let i = 0; i < cantidad; i++) {
        reactivos.push({
            presentacion_reactivo: faker.helpers.arrayElement(presentaciones),
            nom_reactivo: faker.science.chemicalElement().name + ' ' + faker.number.int({max: 100}),
            nom_reactivo_ingles: faker.lorem.word() + ' ' + faker.number.int({max: 100}),
            formula_reactivo: 'H2O' + faker.number.int({min: 1, max: 10}),
            color_almacenamiento: faker.helpers.arrayElement(coloresAlmacenamiento),
            color_stand: faker.helpers.arrayElement(coloresStand),
            stand: 'Stand-' + faker.string.alpha(2).toUpperCase(),
            columna: faker.number.int({min: 1, max: 20}).toString(),
            fila: faker.number.int({min: 1, max: 20}).toString(),
            clasificacion_reactivo: faker.helpers.arrayElement(clasificaciones),
            estado: 1
        });
    }
    await ReactivosModel.bulkCreate(reactivos);
    console.log(`✅ ${cantidad} Reactivos creados.`);

    // 4. Crear 1000 Equipos
    console.log(`⏳ Generando ${cantidad} Equipos...`);
    const equipos = [];
    // Necesitamos obtener IDs de cuentadantes para asociarlos aleatoriamente
    const cuentadantesDB = await CuentadanteModel.findAll({ attributes: ['id_cuentadante'] });
    const cuentadantesIDs = cuentadantesDB.map(c => c.id_cuentadante);

    for (let i = 0; i < cantidad; i++) {
        equipos.push({
            grupo_equipo: faker.helpers.arrayElement(['Equipo de Laboratorio', 'Maquinaria, Equipos y Herramientas']),
            nom_equipo: faker.commerce.productName(),
            marca_equipo: faker.company.name(),
            no_placa: 'PLACA-' + faker.string.alphanumeric(10).toUpperCase(),
            id_cuentadante: faker.helpers.arrayElement(cuentadantesIDs),
            observaciones: faker.lorem.sentence(),
            estado: 1
        });
    }
    await EquiposModel.bulkCreate(equipos);
    console.log(`✅ ${cantidad} Equipos creados.`);

    // 5. Crear 1000 Usuarios (1 admin, resto aprendices)
    console.log(`⏳ Generando ${cantidad} Usuarios...`);
    const usuarios = [];
    const passwordHash = await bcrypt.hash('Prueba1234!', 10);
    
    for (let i = 0; i < cantidad; i++) {
        usuarios.push({
            documento: faker.string.numeric(10),
            nombres_apellidos: faker.person.fullName(),
            email: `usuario_prueba_${i}@sena.edu.co`,
            password: passwordHash,
            rol: 'Aprendiz',
            estado: 'aprobado'
        });
    }
    // Hacemos chunks para no saturar si son muchos
    const chunkSize = 200;
    for (let i = 0; i < usuarios.length; i += chunkSize) {
        const chunk = usuarios.slice(i, i + chunkSize);
        await UserModel.bulkCreate(chunk);
    }
    console.log(`✅ ${cantidad} Usuarios creados.`);

    console.log("🎉 ¡BASE DE DATOS POBLADA EXITOSAMENTE!");
    process.exit();
}

seed().catch(err => {
    console.error("❌ Error poblando base de datos:", err);
    process.exit(1);
});
