const td = require('sluff-td');
const Adaptor = require('sluff-adaptor-lib').default;
const light = td('https://sluff.github.io/things/light');
let isRegistered = false;


module.exports = Adaptor({
    onData: (data, ctx) => {
        try {
            const msg = JSON.parse(data.payload)
            if (!msg.type || msg.type != 'light') {
                return;
            }
            if (!isRegistered) {
                isRegistered = true;
                ctx.bind(msg.id, light);
            }
        } catch (err) {
            console.log(err);
        }
    },
    onAction: (action ,ctx) => {
        switch (action.type) {
            case light.actions.turnOn:
                ctx.send('$baidu/iot/device/sluff-test-0', "turnOn");
                break;
            case light.actions.turnOff:
                ctx.send('$baidu/iot/device/sluff-test-0', "turnOff");
                break;
        }
    }
})
