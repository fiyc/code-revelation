/**
* @Author: fiyc
* @Date : 2018-07-19 09:28
* @FileName : draw-util.js
* @Description : 
    - 这个模块封装了一些threejs的操作
    - 初始化threejs模型
    - 旋转threejs模型
    - 鼠标点击事件逻辑处理
*/

let config = require('./config');
let t = require('./common');
let materialMaker = require('./material-util');
let matrix_util = require('./matrix-util');
let geometry_util = require('./geometry-util');
let matrix = matrix_util(config.orderNum);

let context = null;
let boxes = []; //存储着一个魔方中所有的小模型, 长度应该为 config.orderNum * config.orderNum * config.orderNum
let positionRule = []; //存储魔方中, 每一个轴上的模型中心位置
let canvas = null;
/**
 * 模块构造函数
 * 完成最初模型的绘制
 * 返回 旋转模型, 点击事件处理 等函数
 * @param {*} canvasId 渲染canvas的id
 */
let init = function (canvasId) {
    context = t({
        targetId: canvasId,
        showStats: false
    });
    canvas = document.getElementById(canvasId);

    initCamera();
    initGrid();
    initBoxes();
    context.beginRender();

    return mouseAction();
}

let initGrid = function(){
    var helper = new THREE.GridHelper( 1000, 50 );
    helper.setColors( 0x0000ff, 0x808080 );
    context.scene.add( helper );
}

/**
 * 初始化相机位置
 * 位置信息读取配置
 */
let initCamera = function () {
    let positonInfos = config.cameraPosition;
    context.camera.circlePlanInfo = new circleCoordinate({
        r: config.cameraPosition[0],
        direction: [0, 1, 0],
        position: [0, 0, 45]
    });
    let defaultPositon = context.camera.circlePlanInfo.getPosition();
    context.camera.position.x = defaultPositon[0];
    context.camera.position.y = defaultPositon[1];
    context.camera.position.z = defaultPositon[2];
    // context.camera.up.x = 1;
    // context.camera.up.y = 1;
    // context.camera.up.z = 0;
    context.camera.lookAt(0, 0, 0);
}

/**
 * 相机移动
 * @param {*} x 水平方向移动
 * @param {*} y 垂直方向移动
 */
let moveCamera = function (x, y) {
    context.camera.circlePlanInfo.move(x, y);

    let nextPositon = context.camera.circlePlanInfo.getPosition();
    let nextUp = context.camera.circlePlanInfo.getUp();
    context.camera.position.x = nextPositon[0];
    context.camera.position.y = nextPositon[1];
    context.camera.position.z = nextPositon[2];
    console.log(nextUp);


        context.camera.up.x = nextUp[0];
        context.camera.up.y = nextUp[1];
        context.camera.up.z = nextUp[2];

    context.camera.lookAt(0, 0, 0);
}

/**
 * 初始化魔方模型
 */
let initBoxes = function () {

    //初始化多面体与材质
    // var geometry = new THREE.BoxGeometry(config.singleSize, config.singleSize, config.singleSize);
    var geometry = geometry_util(config.singleSize);
    var material = materialMaker(function () {
        context.render(context.scene, context.camera);
    });


    //根据魔方阶数以及每一个模型的尺寸, 计算出一维下的位置
    let minPositionRule = 0;
    if (config.orderNum % 2 === 1) {
        minPositionRule = -1 * ((config.orderNum - 1) / 2) * config.singleSize;
    } else {
        minPositionRule = -1 * ((config.orderNum / 2 - 1) * config.singleSize + config.singleSize / 2);
    }

    for (let i = 0; i < config.orderNum; i++) {
        positionRule.push(minPositionRule + config.singleSize * i);
    }

    //实例化每一个模型, 加入场景
    for (let z = config.orderNum - 1; z >= 0; z--) {
        for (let y = config.orderNum - 1; y >= 0; y--) {
            for (let x = 0; x < config.orderNum; x++) {
                let currentBox = new THREE.Mesh(geometry, material);
                currentBox.position.x = positionRule[x];
                currentBox.position.y = positionRule[y];
                currentBox.position.z = positionRule[z];
                currentBox.coordinate = new Coordinate();
                currentBox.nextPosition = [positionRule[x], positionRule[y], positionRule[z]];
                currentBox.toNextPosition = toNextPosition;

                boxes.push(currentBox);
                context.scene.add(currentBox);
            }
        }
    }

}


/**
 * 根据参数旋转某一面
 * @param {*} axis 旋转围绕的轴 0: x   1: y   2: z
 * @param {*} axisIndex 在轴正方向上的序号
 * @param {*} isAnti 是否逆时针旋转
 */
let rotating = false;
let rotation = function (axis, axisIndex, isAnti, speed) {
    let planInfo = {
        directory: axis,
        index: axisIndex
    };


    if (!rotating) {
        //获得需要旋转的面包含的模型集合
        let targetPlanBoxes = matrix.getTargetPlanBoxs(boxes, planInfo);
        rotating = true;

        //创建一个包含本次旋转模型的Object3D对象
        let rotationBox = new THREE.Object3D();
        for (let index in targetPlanBoxes) {
            rotationBox.add(targetPlanBoxes[index]);
        }

        //将Object3D对象加入场景
        context.scene.add(rotationBox);

        //计算旋转向量
        let planRotationVecotrArray = [0, 0, 0];
        planRotationVecotrArray[axis] = isAnti ? 1 : -1;
        let planRotationVecotr = new THREE.Vector3(planRotationVecotrArray[0], planRotationVecotrArray[1], planRotationVecotrArray[2]);

        //开启旋转的interval
        let rotationTimes = 0;
        let rotationInterval = setInterval(function () {
            rotationTimes += 1;
            if (rotationTimes <= speed) {
                let radius = Math.PI / (2 * speed);
                rotationBox.rotateOnAxis(planRotationVecotr, radius);
                return;
            }

            //已经旋转完90度, 停止旋转动画
            clearInterval(rotationInterval);

            //将Object3D对象从场景中移除
            context.scene.remove(rotationBox);

            //将旋转面包含的模型重新加入场景
            for (let index in targetPlanBoxes) {
                context.scene.add(targetPlanBoxes[index]);
            }

            //对旋转面包含的模型进行位置调换以及自身旋转
            matrix.rotationPlan(boxes, planInfo, isAnti, function (current, old) {
                //将模型old模型的位置信息， 设置到current的nextPosition上
                current.nextPosition = [old.position.x, old.position.y, old.position.z];

                //将current模型本身进行旋转
                let realVectorArray = current.coordinate.convertVector(planRotationVecotrArray);
                let vector = new THREE.Vector3(realVectorArray[0], realVectorArray[1], realVectorArray[2]);
                current.rotateOnAxis(vector, Math.PI / 2);
            });

            //将所有模型移动到他的nextPosition
            for (let index in targetPlanBoxes) {
                targetPlanBoxes[index].toNextPosition();
            }

            //旋转全部流程结束, 重置 rotating
            rotating = false;
        }, 100);
    }
}

/**
 * 一个三维坐标系类
 * 记录模型自身坐标系与全局坐标系的对应关系
 * 包含从自身坐标系到全局坐标系的转化
 */
let Coordinate = function () {
    this.x = [1, 0, 0];
    this.y = [0, 1, 0];
    this.z = [0, 0, 1];

    /**
     * 获取相对于当前模型，真实的旋转向量
     * @param {*} target 真实坐标系中，旋转围绕的向量
     */
    this.convertVector = function (target) {
        let result;
        let realRorationAxis;
        let realRotationValue;
        for (let i = 0; i < 3; i++) {
            if (target[i] != 0) {
                realRorationAxis = i;
                realRotationValue = target[i];
                break;
            }
        }

        if (this.x[realRorationAxis] != 0) {
            let relativeValue = realRotationValue * this.x[realRorationAxis];
            result = [relativeValue, 0, 0];
        }

        if (this.y[realRorationAxis] != 0) {
            let relativeValue = realRotationValue * this.y[realRorationAxis];
            result = [0, relativeValue, 0];
        }

        if (this.z[realRorationAxis] != 0) {
            let relativeValue = realRotationValue * this.z[realRorationAxis];
            result = [0, 0, relativeValue];
        }

        this.convertRelativeXYZ(result);
        return result;
    }

    /**
     * 计算旋转之后， 当前模型相对的xyz轴在真实坐标系中的对应
     * @param {*} relativeVecotr 
     */
    this.convertRelativeXYZ = function (relativeVecotr) {
        /**
         * 这里首先做一个定义
         * 当我们把x正轴作为基准轴时， y正轴是它的上位轴，z正轴时它的下位值
         * 以此类推:
         *  当我们把y正轴作为基准轴时， z正轴是它的上位轴，x正轴时它的下位值
         *  当我们把z正轴作为基准轴时， x正轴是它的上位轴，y正轴时它的下位值
         * 
         *  然后思考空间坐标系，可以发现
         *  当绕基准轴旋转， 上位轴的位置会变到下位轴， 下位轴位置变到上位轴的反方向
         *  当绕基准轴反方向旋转， 上位轴的位置会变到下位轴反方向， 下位轴位置变到上位轴
         */

        let threeAxis = [this.x, this.y, this.z];

        //这里获取旋转相对的基准轴以及值
        let baseAxisIndex;
        let baseAxisValue;
        for (let i = 0; i < 3; i++) {
            if (relativeVecotr[i] != 0) {
                baseAxisIndex = i;
                baseAxisValue = relativeVecotr[i];
                break;
            }
        }

        //上位轴在threeAxis中的下标
        let upperIndex = baseAxisIndex === 2 ? 0 : baseAxisIndex + 1;
        //下位轴在threeAxis中的下标
        let lowIndex = baseAxisIndex === 0 ? 2 : baseAxisIndex - 1;

        let upperAxis = threeAxis[upperIndex];
        let lowAxis = threeAxis[lowIndex];

        let tempUpperAxis = [];
        let tempLowAxis = [];
        if (baseAxisValue > 0) {
            //上位轴方向变到下位轴所在方向
            tempUpperAxis[0] = lowAxis[0];
            tempUpperAxis[1] = lowAxis[1];
            tempUpperAxis[2] = lowAxis[2];
            //下位轴方向变到上位轴的反方向

            tempLowAxis[0] = -1 * upperAxis[0];
            tempLowAxis[1] = -1 * upperAxis[1];
            tempLowAxis[2] = -1 * upperAxis[2];
        } else {
            //上位轴方向变到下位轴的反方向
            tempUpperAxis[0] = -1 * lowAxis[0];
            tempUpperAxis[1] = -1 * lowAxis[1];
            tempUpperAxis[2] = -1 * lowAxis[2];

            //下位轴方向变到上位轴
            tempLowAxis[0] = upperAxis[0];
            tempLowAxis[1] = upperAxis[1];
            tempLowAxis[2] = upperAxis[2];
        }

        for (let i = 0; i < 3; i++) {
            threeAxis[upperIndex][i] = tempUpperAxis[i];
            threeAxis[lowIndex][i] = tempLowAxis[i];
        }

    }
}

/**
 * 一个球面坐标计算类
 */
let circleCoordinate_bk = function (r, angleY, angleZ) {
    this.r = r; //相机距离远点的距离
    this.angleY = angleY; //相机向量与y轴的夹角
    this.angleZ = angleZ; //相机向量在x-z平面上的投影与z轴正方向的夹角
    this.upY = 1;
    /**
     * 
     * @param {*} angle 
     */
    this.addY = function (angle) {
        let step = 1;
        if (this.angleZ >= 279 || this.angleZ <= 90) {
            step = -1;
        } else {
            step = 1;
        }

        this.angleY += angle * step;

        if (this.angleY > 180 || this.angleY < 0) {
            this.changeZ();
            this.upY *= -1;


            if (this.angleY > 180) {
                this.angleY = 360 - this.angleY;
                // this.angleY -= 180;
            } else {
                this.angleY = Math.abs(this.angleY);
                // this.angleY += 180;
            }
        }


        console.log(`this y: ${this.angleY}, this x: ${this.angleZ}`);
    };

    /**
     * 增加与x轴的夹角
     * @param {*} angle 
     */
    this.addZ = function (angle) {
        this.angleZ += angle;
        if (this.angleZ > 360) {
            this.angleZ -= 360;
        }
    };

    /**
     * 将夹角Z变化到相对于x轴对称的角
     */
    this.changeZ = function () {
        if (this.angleZ <= 180) {
            this.angleZ = 180 - this.angleZ;
        } else {
            this.angleZ = 360 - (this.angleZ - 180)
        }
    }

    /**
     * 计算出位于世界坐标系的坐标
     */
    this.getPosition = function () {
        let angleY = this.angleY * Math.PI / 180;
        let angleZ = this.angleZ * Math.PI / 180;
        // let z = this.r * Math.sin(angleY) * Math.cos(angleZ);
        let t = this.r * Math.cos(Math.abs(angleY - Math.PI / 2));
        let z = t * Math.cos(angleZ);
        // let x = this.r * Math.sin(angleY) * Math.sin(angleZ);
        let x = t * Math.sin(angleZ);
        let y = this.r * Math.cos(angleY);
        console.log(`${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)}`);
        return [x, y, z, this.upY];
    }
}

/**
 * 球面运动计算
 * @param {*} initParam 
 *  {
 *      r: 相机与世界坐标原点距离
 *      direction: 相机头指向向量 [x, y]
 *      position: 相机位置 [x, y]
 *  }
 */
let circleCoordinate_bk2 = function (initParam) {
    let defaultInit = {
        r: 1000,
        direction: [0, 1],
        position: [0, 90]
    };

    defaultInit = Object.assign(defaultInit, initParam);
    this.r = defaultInit.r;
    this.direction = defaultInit.direction;
    this.position = defaultInit.position;


    /**
     * 当前相机位置的纬度不为0 或180时的移动处理逻辑
     * @param {*} value 移动位置 [x, y] x:[-1, 1] y:[-1, 1]
     */
    this.move = function (value) {
        if (this.position[1] === 0 || this.position[0] === 180) {
            this.moveOnPole(value);
            return;
        }

        //计算移动后经纬度
        let moveStep = [0, 0];
        if (this.direction[1] === 1) {
            //当前相机方向指向上
            moveStep = value;
        } else if (this.direction[1] === -1) {
            //当前相机方向指向下
            moveStep = [-1 * value[0], -1 * value[1]];
        } else if (this.direction[0] === 1) {
            //当前相机方向指向右
            moveStep = [value[1], -1 * value[0]];
        } else {
            //当前相机方向指向左
            moveStep = [-1 * value[1], value[0]];
        }

        this.position[0] += moveStep[0];
        this.position[1] += moveStep[1];

        //计算移动后方向
        if (this.position[1] === 0) {
            this.direction = [0, 1];
        } else if (this.position[1] === 180) {
            this.direction = [0, -1];
        }
    }

    /**
     * 当前相机位置的纬度为0 或180时的移动处理逻辑
     * @param {*} value 移动位置 [x, y] x:[-1, 1] y:[-1, 1]
     */
    this.moveOnPole = function (value) {
        let poleFlag = this.position[1] === 0 ? -1 : 1;

        //计算移动后相机头的指向
        let nextDirection = [0, 0];
        if (value[0] === 0) {
            //垂直方向移动
            nextDirection[1] = value[1] * this.direction[1];
        } else {
            //水平方向移动
            nextDirection[0] = value[0] * poleFlag;
        }

        //计算移动后经纬度
        let nextLat = this.position[1] + (-1 * poleFlag);
        let nextLon = 0;

        if (value[0] === 0) {
            //垂直方向移动
            if (value[1] === 1) {
                //向前运动时才修改经度
                nextLon = this.position[0] + 180;
            } else {
                nextLon = this.position[0];
            }

            if (nextLon >= 360) {
                nextLon -= 360;
            }
        } else {
            //水平方向移动
            nextLon = this.position[0] + value[0] * 90 * poleFlag;
            if (nextLon >= 360) {
                nextLon -= 360;
            } else if (nextLon < 0) {
                nextLon += 360;
            }
        }

        this.direction = nextDirection;
        this.position = [nextLon, nextLat];
    }

    this.getPosition = function () {
        /**
         * θ 为与y轴夹角 angleY
         * φ 为与z轴夹角 angleZ
         * z=rsinθcosφ.
         * x=rsinθsinφ.
         * y=rcosθ.
         */
        let angleY = (180 - this.position[1]) * Math.PI / 180;
        let angleZ = this.position[0] * Math.PI / 180;


        let x = this.r * Math.sin(angleY) * Math.sin(angleZ);
        let y = this.r * Math.cos(angleY);
        let z = this.r * Math.sin(angleY) * Math.cos(angleZ);

        return [x, y, z];
    }

    this.getUp = function () {
        return [this.direction[0], this.direction[1], 0];
    }
}

/**
 * 球面运动计算
 * 以原点为中心, 做一个长宽高为90，且棱与xyz轴垂直或平行的正方体
 * 当前类记录相机与原点的距离, 以及原点与相机连线与正方体的交点
 * @param {*} initParam 
 *  {
 *      r: 相机与世界坐标原点距离
 *      direction: 相机头指向向量 [x, y, z]
 *      position: 相机位置 [x, y, z]
 *  }
 */
let circleCoordinate = function (initParam) {
    let defaultInit = {
        r: 1000,
        direction: [0, 1, 0],
        up: [0, 1, 0],
        position: [0, 0, 45]
    };

    defaultInit = Object.assign(defaultInit, initParam);
    this.r = defaultInit.r;
    this.direction = defaultInit.direction;
    this.position = defaultInit.position;
    this.up = defaultInit.up;

    /**
     * 相机移动
     * 该函数主要有两个问题要解决
     *  1. 在移动过后, positon需要改变， 且在穿越棱边时需要处理
     *  2. direction需要修改
     * @param {*} x 相机在当前自身相对的水平方向移动位置
     * @param {*} y 相机在当前自身相对的水平方向移动位置
     */
    this.move = function (x, y) {
        let tempPostion = [this.position[0], this.position[1], this.position[2]];

        /**
         * 思考模型可以发现, 当做水平方向移动时, direction不会发生改变
         * 这种场景比较简单, 因此先处理这种情况
         */
        let anixIndex = 0;
        for (let i = 0; i < this.direction.length; i++) {
            if (this.direction[i] != 0) {
                anixIndex = i;
                break;
            }
        }

        let virualXIndex = anixIndex + this.direction[anixIndex];
        virualXIndex = virualXIndex > 2 ? 0 : (virualXIndex < 0 ? 2 : virualXIndex);

        let virualYIndex = anixIndex - this.direction[anixIndex];
        virualYIndex = virualYIndex > 2 ? 0 : (virualYIndex < 0 ? 2 : virualYIndex);

        let virualX = this.position[virualXIndex]
        let virualY = this.position[virualYIndex];

        let virualMoveResult = twoCoordinateMove([virualX, virualY], x);
        this.position[virualXIndex] = virualMoveResult[0];
        this.position[virualYIndex] = virualMoveResult[1];

        let loopNum = Math.abs(y);
        let singleStep = y > 0 ? 1 : -1;
        for (let i = 0; i < loopNum; i++) {
            this.verSingleMove(singleStep);
        }

        let changeUp = [this.position[0] - tempPostion[0], this.position[1] - tempPostion[1], this.position[2] - tempPostion[2]];

        
    }

    /**
     * 给定在平面直角坐标系中一个x [-45, 45] y [-45, 45]的路径,
     * 给定一个起始位置
     * 给定一个运动次数
     * 返回运动结束时的坐标
     * @param {*} begin 起始位置
     * @param {*} step 运动次数 正为逆时针走，
     */
    let twoCoordinateMove = function (begin, step) {
        let anti = step > 0 ? 1 : -1;
        let moveNum = Math.abs(step);

        let result = [begin[0], begin[1]];
        for (let i = 0; i < moveNum; i++) {
            if (result[0] === 45) {
                result[1] += anti;

                if (result[1] > 45 || result[1] < -45) {
                    result[1] = result[1] > 0 ? 45 : -45;
                    result[0] -= 1;
                }
                continue;
            }

            if (result[1] === 45) {
                result[0] -= anti;

                if (result[0] < -45 || result[0] > 45) {
                    result[0] = result[0] > 0 ? 45 : -45;
                    result[1] -= 1;
                }
                continue;
            }

            if (result[0] === -45) {
                result[1] -= anti;

                if (result[1] > 45 || result[1] < -45) {
                    result[1] = result[1] > 0 ? 45 : -45;
                    result[0] += 1;
                }
                continue;
            }

            if (result[1] === -45) {
                result[0] += anti;

                if (result[0] > 45 || result[0] < -45) {
                    result[0] = result[0] > 0 ? 45 : -45;
                    result[1] += 1;
                }
                continue;
            }
        }

        return result;
    }

    /**
     * 垂直运动 - 单步
     * @param {*} step 
     */
    this.verSingleMove = function (step) {
        let directionIndex = 0;
        for (let i = 0; i < this.direction.length; i++) {
            if (this.direction[i] != 0) {
                directionIndex = i;
                break;
            }
        }

        let planIndex = 0;
        let planFlag = 1;
        for (let i = 0; i < this.position.length; i++) {
            if ((this.position[i] === 45 || this.position[i] === -45) && i !== directionIndex) {
                planIndex = i;
                planFlag = this.position[i] > 0 ? 1 : -1;
                break;
            }
        }

        this.position[directionIndex] += this.direction[directionIndex] * step;

        if (this.position[directionIndex] > 45 || this.position[directionIndex] < -45) {
            this.position[directionIndex] = this.position[directionIndex] > 0 ? 45 : -45;
            this.position[planIndex] -= planFlag;

            this.direction = [0, 0, 0];
            let directionFlag = step < 0 ? planFlag : -1 * planFlag;
            this.direction[planIndex] = directionFlag;
        }
    }

    this.getPosition = function () {
        let currentPositonDistance = Math.sqrt(Math.pow(this.position[0], 2) + Math.pow(this.position[1], 2) + Math.pow(this.position[2], 2));

        let scale = this.r / currentPositonDistance;

        let resultX = this.position[0] * scale;
        let resultY = this.position[1] * scale;
        let resultZ = this.position[2] * scale;

        return [resultX, resultY, resultZ];
    }

    this.getUp = function () {
        return [this.direction[0], this.direction[1], this.direction[2]];
    }
}

/**
 * 针对threejs mesh对象定义的公共方法
 * 用于将模型的positon这是为模型本身的nextPosition
 */
let toNextPosition = function () {
    this.position.x = this.nextPosition[0];
    this.position.y = this.nextPosition[1];
    this.position.z = this.nextPosition[2];
}

setInterval(function () {
    // let axis = Math.round(Math.random() * 3);
    // let index = Math.round(Math.random() * 3);
    // console.log(`${axis} _ ${index}`);
    // rotation(axis, index, false, config.normalSpeed);
}, 2000);


/**
 * 鼠标事件处理函数
 * 通过鼠标事件来维护内部状态
 * 最后产生事件
 */
let mouseAction = function () {
    //初次点击是否命中模型
    let isClickBox = false;

    let beginPoint = [];
    let endPoint = [];


    //初次点击命中的模型
    let beginBox = null;
    //最后一次命中的有效模型
    let endBox = null;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    let canvasPositionInfo = canvas.getBoundingClientRect();

    /**
     * 根据屏幕点击的坐标, 获取到threejs中的实例
     * @param {*} x 屏幕x坐标
     * @param {*} y 屏幕y坐标
     */
    let clickTarget = function (x, y) {
        x = x - canvasPositionInfo.x;
        y = y - canvasPositionInfo.y;

        mouse.x = (x / context.width) * 2 - 1;
        mouse.y = - (y / context.height) * 2 + 1;

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera(mouse, context.camera);

        var intersects = raycaster.intersectObjects(context.scene.children);
        if (intersects && intersects.length > 0) {
            return intersects[0];
        } else {
            return null;
        }
    }

    /**
     * 获取修正过的点击坐标
     * 修正过的点击坐标为所选择的模型被点击的那一面的中心位置
     * @param {*} clickObject 点击的模型
     */
    let correctPosition = function (clickObject) {
        let result = {};
        result.clickPoint = [];
        result.clickPoint.push(clickObject.object.position.x);
        result.clickPoint.push(clickObject.object.position.y);
        result.clickPoint.push(clickObject.object.position.z);

        //点击坐标必定有一个轴贴近这个面的坐标
        let planPosition = Math.abs(positionRule[0]) + config.singleSize / 2;

        let clickPoint = clickObject.point;
        let cx = Math.abs(Math.abs(clickPoint.x) - planPosition);
        let cy = Math.abs(Math.abs(clickPoint.y) - planPosition);
        let cz = Math.abs(Math.abs(clickPoint.z) - planPosition);

        if (cx <= cy && cx <= cz) {
            result.clickPoint[0] = clickPoint.x > 0 ? planPosition : -1 * planPosition;
            result.clickPlan = 0;
        } else if (cy <= cx && cy <= cz) {
            result.clickPoint[1] = clickPoint.y > 0 ? planPosition : -1 * planPosition;
            result.clickPlan = 1;
        } else {
            result.clickPoint[2] = clickPoint.z > 0 ? planPosition : -1 * planPosition;
            result.clickPlan = 2;
        }

        return result;

    }

    /**
     * 判断两次点击是否在同一线
     * 判断是否在同一线的依据是, 两次点击坐标, 至少有两个轴是相同的
     * @param {*} a 修正过后的开始点击坐标
     * @param {*} b 修正过后的结束点击坐标
     */
    let isSameLine = function (a, b) {
        let sameNum = 0;
        for (let i = 0; i < 3; i++) {
            if (a[i] === b[i]) {
                sameNum += 1;
            }
        }

        return sameNum >= 2;
    }

    /**
     * 根据开始坐标和结束坐标计算旋转
     * 
     */
    let calculateRotation = function () {
        let beginPosition = beginBox.correctPosition.clickPoint;
        let endPosition = endBox.correctPosition.clickPoint;

        //获取运动过程中, 哪个轴的值是始终不变的
        let unChangeAxis = beginBox.correctPosition.clickPlan;
        //获取运动方向对应的轴
        let moveAxis = 0;
        for (let i = 0; i < 3; i++) {
            if (beginPosition[i] !== endPosition[i]) {
                moveAxis = i;
                break;
            }
        }

        //旋转围绕的轴
        let rotationAxis = 3 - unChangeAxis - moveAxis;
        let index = 0;
        for (let i = 0; i < positionRule.length; i++) {
            if (positionRule[i] === beginPosition[rotationAxis]) {
                index = positionRule.length - i - 1;
                break;
            }
        }

        //将三维坐标系转化到二维坐标系, 旋转轴正方向指向视角
        let vector2_begin = null;
        let vector2_end = null;

        switch (rotationAxis) {
            case 0: {
                vector2_begin = {
                    x: -1 * beginPosition[2],
                    y: beginPosition[1]
                };

                vector2_end = {
                    x: -1 * endPosition[2],
                    y: endPosition[1]
                };
                break;
            }
            case 1: {
                vector2_begin = {
                    x: beginPosition[0],
                    y: -1 * beginPosition[2]
                };

                vector2_end = {
                    x: endPosition[0],
                    y: -1 * endPosition[2]
                };
                break;
            }
            case 2: {
                vector2_begin = {
                    x: beginPosition[0],
                    y: beginPosition[1]
                };

                vector2_end = {
                    x: endPosition[0],
                    y: endPosition[1]
                };
                break;
            }
        }

        let isAnti = false;
        if (vector2_begin.x === vector2_end.x) {
            let distance = vector2_end.y - vector2_begin.y;

            let cal1 = vector2_begin.x > 0 ? 1 : -1;
            let cal2 = distance > 0 ? 1 : -1;

            isAnti = cal1 * cal2 > 0;
        } else {
            let distance = vector2_end.x - vector2_begin.x;

            let cal1 = vector2_begin.y > 0 ? 1 : -1;
            let cal2 = distance > 0 ? -1 : 1;

            isAnti = cal1 * cal2 > 0;
        }

        return {
            axis: rotationAxis,
            index: index,
            isAnti: isAnti
        }
    }

    let mouseClick = function (x, y) {
        beginPoint = [x, y];
        let clickBox = clickTarget(x, y);

        if (!clickBox) {
            isClickBox = false;
            return;
        }

        isClickBox = true;
        let correctPoint = correctPosition(clickBox);
        beginBox = {
            correctPosition: correctPoint,
            boxInfo: clickBox
        };
    }

    let mouseMove = function (x, y) {
        endPoint = [x, y];
        if (!isClickBox) {
            //初次点击未命中模型, 做旋转相机运动
            moveCamera(0, 1);
            return;
        }

        let clickBox = clickTarget(x, y);
        if (!clickBox) {
            return;
        }

        let correctPoint = correctPosition(clickBox);
        if (isSameLine(beginBox.correctPosition.clickPoint, correctPoint.clickPoint)) {
            endBox = {
                correctPosition: correctPoint,
                boxInfo: clickBox
            }
        }
    }

    let mouseUp = function (x, y) {
        if (isClickBox && beginBox && endBox) {
            //旋转模型
            let rotationInfo = calculateRotation();
            rotation(rotationInfo.axis, rotationInfo.index, rotationInfo.isAnti, config.normalSpeed);
        } else {
            //旋转相机
        }

        isClickBox = false;
        beginBox = null;
        endBox = null;
        beginPoint = [];
        endPoint = [];
    }

    let testMove = function (x, y) {
        moveCamera(x, y);
    }

    return {
        mouseClick,
        mouseMove,
        mouseUp,
        testMove
    };
}

module.exports = init;