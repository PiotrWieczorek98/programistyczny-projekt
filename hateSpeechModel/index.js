const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node-gpu');
const use = require('@tensorflow-models/universal-sentence-encoder');
const posts_training = require('./training.json');
const posts_testing = require('./testing.json');

const encodeData = data => {
    const sentences = data.map(posts_training => posts_training.post.toLowerCase());
    const trainingData = use.load()
        .then(model => {
            return model.embed(sentences)
                .then(embeddings => {
                    return embeddings;
                });
        })
        .catch(err => console.error('Fit Error:', err));

    return trainingData
};

const outputData = tf.tensor2d(posts_training.map(post => [
    post.label === 0 ? 1 : 0,
    post.label === 1 ? 1 : 0,
]));

const model = tf.sequential();

// Add layers to the model
model.add(tf.layers.dense({
    inputShape: [512],
    activation: 'sigmoid',
    units: 2,
}));

model.add(tf.layers.dense({
    inputShape: [2],
    activation: 'sigmoid',
    units: 2,
}));

model.add(tf.layers.dense({
    inputShape: [2],
    activation: 'sigmoid',
    units: 2,
}));

// Compile the model
model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.adam(.06), // This is a standard compile config
});

async function run() {
    Promise
        .all([
            encodeData(posts_training),
            encodeData(posts_testing)
        ])
        .then(data => {
            const {
                0: training_data,
                1: testing_data,
            } = data;

            // model.fit(training_data, outputData, { epochs: 200 })
            //     .then(history =>
            //         model.predict(testing_data).print())
            // console.log("Model saved!");
            // model.save('file://./tfjs');

            const model = tf.loadLayersModel('file://./tfjs/model.json');
            model.predict(testing_data).print();
            model.summary();
        });
    console.log(data);

}

// Call function
run();
