import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const consumoreactivoModel = db.define('consumoreactivo', {
    id_consumo_reactivos: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_reactivo: { type: DataTypes.INTEGER },
    id_lote: { type: DataTypes.INTEGER },
    cantidad: { type: DataTypes.FLOAT },
    id_responsable: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.INTEGER, defaultValue: 1 },
}, {
    freezeTableName: true,
});

export default consumoreactivoModel;
