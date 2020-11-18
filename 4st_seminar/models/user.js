module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        //모델의 Attributes (Column)을 정의하는곳
        email: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        //모델의 옵션들을 지정하는곳
        freezeTableName: true, //true : 모델명과 DB테이블을 동일하게 설정
        timestamps: false, //default값 true, 자동적으로 createdAt,updatedAt이 추가되는데 이를 막아줄 수 있음(false)
    });
};