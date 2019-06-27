'use strict';

const {
  login
} = require("tplink-cloud-api");

module.exports.trigger = async (event) => {
  const data = JSON.parse(event.body)

  console.log('🔥 💁‍')
  console.log(data.state)


  const tplink = await login(process.env.tplink_user, process.env.tplink_password);
  await tplink.getDeviceList();
  if (data.state === 'ok' || data.state === 'paused' || data.state === 'pending') {
    await tplink.getHS100(process.env.tplink_device_name).powerOff();

    return {
      statusCode: 200
    }
  } else {
    await tplink.getHS100(process.env.tplink_device_name).toggle();
    return {
      statusCode: 200
    }

  }

};