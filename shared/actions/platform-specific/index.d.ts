import * as Container from '../../util/container'
import * as RPCChatTypes from '../../constants/types/rpc-chat-gen'

type NextURI = string

export declare function showShareActionSheet(options: {
  filePath?: any | null
  message?: any | null
  mimeType: string
}): Promise<{
  completed: boolean
  method: string
}>

export declare function saveAttachmentToCameraRoll(fileURL: string, mimeType: string): Promise<void>
export declare function requestLocationPermission(mode: RPCChatTypes.UIWatchPositionPerm): Promise<void>
export declare function requestAudioPermission(): Promise<void>
export declare function watchPositionForMap(dispatch: Container.TypedDispatch): Promise<() => void>

export declare function displayNewMessageNotification(
  text: string,
  convID: string | null,
  badgeCount: number | null,
  myMsgID: number | null,
  soundName: string | null
): void

export declare function clearAllNotifications(): void

export declare function initPlatformListener(): void
