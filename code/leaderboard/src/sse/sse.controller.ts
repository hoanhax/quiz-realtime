import { Controller, Sse, MessageEvent, Logger } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Observable, fromEvent, map } from 'rxjs'
import { EMITER_EVENTS } from '../share/enums/emiter-event.enum'

@Controller()
export class SseController {
  private readonly logger = new Logger(SseController.name)

  constructor(private eventEmitter: EventEmitter2) {}

  /**
   * Enpoint to allow client connect via SSE
   */
  @Sse('/sse')
  async sse(): Promise<Observable<MessageEvent>> {
    // Receive emiter event base on event EMITER_EVENTS.SCORE_EVENT
    // Then send to client via SSE
    try {
      return fromEvent(this.eventEmitter, EMITER_EVENTS.SCORE_EVENT).pipe(
        map((payload) => ({
          data: JSON.stringify(payload),
        })),
      )
    } catch (error) {
      this.logger.error('Error setting up SSE', error)
      throw new Error('Failed to establish SSE connection')
    }
  }
}
