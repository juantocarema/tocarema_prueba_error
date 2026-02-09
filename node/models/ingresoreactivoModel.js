import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const ingresoreactivoModel = db.define('ingresoreactivo', {
    id_ingreso_reactivo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fech_ingreso: { type: DataTypes.DATE },
    cantidad_ingreso: { type: DataTypes.FLOAT },
    id_responsable: { type: DataTypes.INTEGER },
    id_lote: { type: DataTypes.INTEGER },
    id_reactivo: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.INTEGER, defaultValue: 1 },
}, {
    freezeTableName: true,
});

export default ingresoreactivoModel;
