import * as RouteTreeGen from '../actions/route-tree-gen'
import * as Container from '../util/container'
import * as GregorGen from '../actions/gregor-gen'
import type * as Tabs from '../constants/tabs'
import openURL from '../util/open-url'
import {
  currentVersion,
  lastVersion,
  lastLastVersion,
  noVersion,
  getSeenVersions,
  anyVersionsUnseen,
} from '../constants/whats-new'
import {Current, Last, LastLast} from './versions'
import WhatsNew from '.'
import type {NavigateAppendPayload} from '../actions/route-tree-gen'

type OwnProps = {
  // Desktop only: popup.desktop.tsx passes this function to close the popup
  // when navigating within the app
  onBack?: () => void
}

const WhatsNewContainer = (ownProps: OwnProps) => {
  const lastSeenVersion = Container.useSelector(state => state.config.whatsNewLastSeenVersion)
  const dispatch = Container.useDispatch()
  const _onNavigate = (props: NavigateAppendPayload['payload']) => {
    dispatch(RouteTreeGen.createNavigateAppend(props))
  }

  const _onNavigateExternal = (url: string) => {
    openURL(url)
  }
  const _onSwitchTab = (tab: Tabs.AppTab) => {
    dispatch(RouteTreeGen.createSwitchTab({tab}))
  }

  const _onUpdateLastSeenVersion = (lastSeenVersion: string) => {
    const action = GregorGen.createUpdateCategory({
      body: lastSeenVersion,
      category: 'whatsNewLastSeenVersion',
    })
    dispatch(action)
  }
  const seenVersions = getSeenVersions(lastSeenVersion)
  const newRelease = anyVersionsUnseen(lastSeenVersion)
  const onBack = () => {
    if (newRelease) {
      _onUpdateLastSeenVersion(currentVersion)
    }
    if (ownProps.onBack) {
      ownProps.onBack()
    }
  }
  const props = {
    Current,
    Last,
    LastLast,
    currentVersion,
    lastLastVersion,
    lastVersion,
    noVersion,
    onBack,
    // Navigate then handle setting seen state and closing the modal (desktop only)
    onNavigate: (props: NavigateAppendPayload['payload']) => {
      _onNavigate(props)
      onBack()
    },
    onNavigateExternal: _onNavigateExternal,
    onSwitchTab: _onSwitchTab,
    seenVersions,
  }
  return <WhatsNew {...props} />
}

export default WhatsNewContainer
