'use strict';
var mqtt = require('mqtt');
var opt = {
    host: "40cd7a868ac8408791d3692b746ccdf8.mqtt.iot.gz.baidubce.com",
    port: 1883,
    username: "40cd7a868ac8408791d3692b746ccdf8/sluff-test-0",
    password: "5ra0o8N67xkaUQCMuwWjCq/ZSDQpTz+VFjeUAGv9LaM=",
};
function registSwitchAndLight(client) {
    console.log('registered');
    client.publish("$baidu/iot/data/sluff-test-0", JSON.stringify({
        type: 'light',
        id: "mylight",
    }))
    client.publish("$baidu/iot/data/sluff-test-0", JSON.stringify({
        type: 'switch',
        id: "myswitch",
    }))
}

$.ready(function (error) {
    $('#led-g').turnOff();
    if (error) {
        console.log(error);
        return;
    }
    var isOn = false;
    var client = mqtt.connect(opt)
    client.on('connect', function () {
        console.log('connect to baidu iot hub');
        client.subscribe("$baidu/iot/device/sluff-test-0");
        setTimeout(function() {
            registSwitchAndLight(client);
        }, 1000);
        $('#button-k3').on('push', function () {
            isOn = !isOn;
            var event;
            if (isOn) {
                event = 'turnedOn';
            } else {
                event = 'turnedOff';
            }
            client.publish("$baidu/iot/data/sluff-test-0", JSON.stringify({
                type: 'switch',
                id: "myswitch",
                event: event
            }));
        });
    });
    client.on('message', function (topic, msg) {
        var cmd = msg.toString();
        console.log(cmd);
        switch (cmd) {
            case 'turnOn':
                $('#led-g').turnOn();
                break;
            case 'turnOff':
                $('#led-g').turnOff();
                break;
            default:
                break;
        }
    });
});

$.end(function () {
    $('#led-r').turnOff();
});