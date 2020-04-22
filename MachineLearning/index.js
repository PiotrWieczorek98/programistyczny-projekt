import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';

// Import data for training and testing the model
import training from './training.hate-recognition.json';
import testing from './testing.hate-recognition.json';

// Function for encoding the dataset
const encodeData = data => {
    const sentences = data.map(comment => comment.text.toLowerCase());
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

// Creating a boolean values which tells whether the comment was an example of hate or not
// [hate, none] 1 means yes, 0 means no, so [1, 0] or [0, 1] will be the output
const outputData = tf.tensor2d(comments.map(comment => [
    comment.intent === 'hate' ? 1 : 0,
    comment.intent === 'none' ? 1 : 0,
]));

// Building the model
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
    optimizer: tf.train.adam(.06),
});

// Training an testing the model
function run() {
    Promise.all([
        encodeData(training),
        encodeData(testing)
    ])
        .then(data => {
            const {
                0: training_data,
                1: testing_data,
            } = data;

            model.fit(training_data, outputData, { epochs: 200 })
                .then(history => {
                    model.predict(testing_data).print();
                });
        })
        .catch(err => console.log('Prom Err:', err));
};

// Call function
run();
