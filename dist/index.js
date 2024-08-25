import app from '@/app';
import { env } from '@/configs/env';
import logger from '@/utils/logger';
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨🌎 Service 🤖 running 🌏✨🌈🦄'
    });
});
app.listen(PORT, () => {
    logger.info(`Server is running in ${env.NODE_ENV} mode on port ${PORT}`);
});
