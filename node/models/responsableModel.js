import db from '../database/db.js'

import { DataTypes } from "sequelize";


const responsableModel = db.define('responsable', {

    id_responsable: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING},
    apellido: {type: DataTypes.STRING},
    correo: {type: DataTypes.STRING},
    numero_telefono: {type: DataTypes.STRING},
    cargo:{type: DataTypes.ENUM('instructor', 'pasante', 'gestor')},
    id_usuario: {type: DataTypes.INTEGER},
    estado: {type: DataTypes.TINYINT, defaultValue: 1},

}, {
    freezeTableName: true,
});

export default responsableModel;