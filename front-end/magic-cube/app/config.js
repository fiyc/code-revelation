/**
* @Author: fiyc
* @Date : 2018-07-18 18:10
* @FileName : config.js
* @Description : 
    应用默认配置
*/

let defaultConfig = {
    //魔方阶数
    orderNum : 3,
    //每个小方块尺寸
    singleSize: 100,
    //打乱操作时，旋转速度
    confusionSpeed: 2,
    //正常操作时，旋转速度
    normalSpeed: 5,

    
    /**
     * 相机初始位置 [r, 与z轴夹角, 与x轴夹角]
     * [
     * 相机距离远点的距离,
     * 相机向量在z-x平面上的投影与z轴正方向的夹角
     * 相机向量在z-y平面上的投影与z轴正方向的夹角
     * ]
     */
    cameraPosition: [1000, 0, 0],
};

module.exports = defaultConfig;