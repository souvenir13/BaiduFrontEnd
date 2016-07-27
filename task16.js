/**
 * Created by chen on 2016/7/27.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var numInput = document.getElementById("aqi-value-input");
var tableNode = document.getElementById("aqi-table");
/**
 * 验证输入框中的文本
 */
function checkCity(x){
    var pattern=/^([\u4E00-\uFA29]*[a-z]*[A-Z]*)+$/;
    var content = x.value.trim();//trim()去除前后空格
    if (content == ""){
        alert("请输入城市名称！");
        x.focus();
    }else if(pattern.test(content)!=true){
        alert("城市名称必须为中英文字符！");
        x.focus();
    }
}

function checkValue(x){
    var pattern=/^[0-9]*[1-9][0-9]*$/;
    var content = x.value.trim();
    if (content == ""){
        alert("请输入空气质量指数！");
        x.focus();
    }else if(pattern.test(content)!=true){
        alert("空气质量指数必须为整数！");
        x.focus();
    }
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim();
    var value = numInput.value.trim();

    aqiData[city] = value;
    //alert(aqiData);
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    tableNode.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
    for(var key in aqiData){
        var trNode = document.createElement("tr");
        trNode.innerHTML = "<td>"+key+"</td><td>"+aqiData[key]+"</td><td><button>删除</button></td>";
        tableNode.appendChild(trNode);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(n) {
    // do sth.
    var i = n.parentNode.parentNode.rowIndex;//获取table中n所在行数
    //tableNode.deleteRow(i);//删除该行
    var num = 1;
    for(var key in aqiData){
        if(num == i){
            delete aqiData[key];
        }
        num = num + 1;
    }
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btn = document.getElementById("add-btn");
    btn.addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    tableNode.addEventListener("click",function(e){
        if(e.target.nodeName.toLowerCase() === "button") {
            delBtnHandle(e.target);
        }
    });
}

init();

