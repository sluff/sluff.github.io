const td = require('sluff-td');
const Adaptor = require('sluff-adaptor-lib').default;
const tdSwitch = td('https://sluff.github.io/things/switch');
let isRegistered = false;


module.exports = Adaptor({
    onData: (data, ctx) => {
        try {
            const msg = JSON.parse(data.payload)
            if (!msg.type || msg.type != 'switch') {
                return;
            }
            if (!isRegistered) {
                console.log('switch status:', isRegistered);
                isRegistered = true;
                ctx.bind(msg.id, tdSwitch);
            }
            if (msg.event) {
                console.log(msg.event);
                switch (msg.event) {
                    case 'turnedOn':
                        ctx.emit(msg.id, tdSwitch.events.turnedOn);
                        break;
                    case 'turnedOff':
                        ctx.emit(msg.id, tdSwitch.events.turnedOff);
                        break;
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    onAction: (action, ctx) => {
    }
})
