import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const UsuariosPermitidosModel = sequelize.define('usuarios_permitidos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombres_apellidos: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: true
});

export default UsuariosPermitidosModel;
