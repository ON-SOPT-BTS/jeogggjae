module.exports = (sequelize, DataTypes) => {
    return sequelize.define('list', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        subtitle: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        ImageUrl: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        mostSerch: {
            type: DataTypes.INTEGER,
            allowNull: True
        },
        popularTwenty: {
            type: DataTypes.INTEGER,
            allowNull: True
        },
        popularBroad: {
            type: DataTypes.INTEGER,
            allowNull: True
        },
        popularNow: {
            type: DataTypes.INTEGER,
            allowNull: True
        }
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true,
        timestamps: true,
    });
};