import mongoose from 'mongoose';
import config from '../config';

(async () => {
    try {
        await mongoose.connect(config.database_url, {
            useCreateIndex: false,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            loggerLevel: 'info',
            logger: console.info
        });
        console.log(`Подключение к базе данных - успешно!`);
    } catch(e){
        console.error(`Не удалось подключиться к базе данных: ${e.message}\n${e.stack}`);
        return process.exit(-1);
    }
})();

export default mongoose;