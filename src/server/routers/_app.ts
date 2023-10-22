import { router } from '@/server/trpc';
import CodeRouter from '@/server/routers/subrouters/code.router';
import ConversationRouter from '@/server/routers/subrouters/conversation.router';
import ImageRouter from '@/server/routers/subrouters/image.router';
import MusicRouter from '@/server/routers/subrouters/music.router';
import PaymentRouter from '@/server/routers/subrouters/payment.router';
import VideoRouter from '@/server/routers/subrouters/video.router';

const AppRouter = router({
  code: CodeRouter,
  conversation: ConversationRouter,
  image: ImageRouter,
  music: MusicRouter,
  payment: PaymentRouter,
  video: VideoRouter,
});

export type TAppRouter = typeof AppRouter;

export default AppRouter;
