import app from '@/app';
import { env } from '@/configs/env';
import logger from '@/utils/logger';

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running in ${env.NODE_ENV} mode on port ${PORT}`);
});
