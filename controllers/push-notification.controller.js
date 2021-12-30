const uuid = require("uuid");
const db = require("../models");
const { subscribes: Subscribes } = db;
const q = require("q");
const webPush = require("web-push");
const keys = require("../config/keys");

exports.createSubscribers = (req, res) => {
  console.log(req, res);
  const subscribe = new Subscribes({
    userId: req.body.userId,
    subscriprion : req.body.subscriprion
  });

  subscribe.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.status(200).send({ message: "Subscriber Successfully created!" });
    }
  });
};

exports.sendPushNotification = (req, res) => {
  const payload = {
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    ttl: req.body.ttl,
    icon: req.body.icon,
    image: req.body.image,
    badge: req.body.badge,
    tag: req.body.tag,
  };
  Subscribes.find({}, (err, subscribes) => {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);
      res.status(500).send({
        error: "Technical error occurred",
      });
    } else {
      let parallelSubscriptionCalls = subscribes.map((subscribe) => {
        return new Promise((resolve, reject) => {
          const pushSubscription = {
            endpoint: subscribe.subscriprion.endpoint,
            keys: {
              p256dh: subscribe.subscriprion.keys.p256dh,
              auth: subscribe.subscriprion.keys.auth,
            },
          };

          const pushPayload = JSON.stringify(payload);
          const pushOptions = {
            vapidDetails: {
              subject: "http://example.com",
              privateKey: keys.privateKey,
              publicKey: keys.publicKey,
            },
            TTL: payload.ttl,
            headers: {},
          };
          webPush
            .sendNotification(pushSubscription, pushPayload, pushOptions)
            .then((value) => {
              resolve({
                status: true,
                endpoint: subscribe.subscription.endpoint,
                data: value,
              });
            })
            .catch((error) => {
              reject({
                status: false,
                endpoint: subscribe.subscriprion.endpoint,
                data: error,
              });
            });
        });
      });
      q.allSettled(parallelSubscriptionCalls).then((pushResults) => {});
      res.status(200).send({message : 'Push Notification Tiggred'});
    }
  });
};
