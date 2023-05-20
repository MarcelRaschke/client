import * as Constants from '../constants/settings'
import {newRoutes as devicesRoutes} from '../devices/routes'
import {newRoutes as gitRoutes} from '../git/routes'

import about from './about.page'
import account from './account/page'
import advanced from './advanced.page'
import chat from './chat.page'
import crypto from '../crypto/sub-nav/page'
import display from './display.page'
import feedback from './feedback/page'
import fs from './files/page'
import invitations from './invites/page'
import notifications from './notifications/page'
import whatsNew from '../whats-new/page'
import addEmail from './account/email.page'
import addPhone from './account/phone.page'
import settingsVerifyPhone from './account/verify-phone.page'
import dbNukeConfirm from './db-nuke-confirm/page'
import inviteSent from './invite-generated/page'
import logOut from './logout/page'
import password from './password/page'
import deleteConfirm from './delete-confirm/page'
import disableCertPinningModal from './disable-cert-pinning-modal/page'
import settingsDeleteAddress from './account/confirm-delete.modal.page'

export const sharedNewRoutes = {
  [Constants.aboutTab]: {...about},
  [Constants.accountTab]: {...account},
  [Constants.advancedTab]: {...advanced},
  [Constants.chatTab]: {...chat},
  [Constants.cryptoTab]: {...crypto},
  [Constants.devicesTab]: {...devicesRoutes.devicesRoot},
  [Constants.displayTab]: {...display},
  [Constants.feedbackTab]: {...feedback},
  [Constants.fsTab]: {...fs},
  [Constants.gitTab]: {...gitRoutes.gitRoot},
  [Constants.invitationsTab]: {...invitations},
  [Constants.notificationsTab]: {...notifications},
  [Constants.whatsNewTab]: {...whatsNew},
  addEmail,
  addPhone,
  dbNukeConfirm,
  inviteSent,
  removeDevice: {...devicesRoutes.deviceRevoke},
}

export const sharedNewModalRoutes = {
  [Constants.logOutTab]: logOut,
  [Constants.passwordTab]: password,
  deleteConfirm,
  disableCertPinningModal,
  settingsAddEmail: addEmail,
  settingsAddPhone: addPhone,
  settingsDeleteAddress,
  settingsVerifyPhone,
}
