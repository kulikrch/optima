import mongoose from 'mongoose';

interface ICar {
  brand: string;
  name: string;
  year: number;
  price: number;
}

const carSchema = new mongoose.Schema<ICar>({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
});

let connection: mongoose.Connection | null = null;
const Car = mongoose.model<ICar>('Car', carSchema);

const connect = async (uri: string) => {
    try {
        await mongoose.connect(uri);

        connection = mongoose.connection;

        mongoose.connection.on('error', err => {
            console.error('Db error: ', err);
        });

    }
    catch (error) {
        console.error('Error connecting to db: ', error);
        return false;
    }

    return true;
};

export { connect, connection, Car };