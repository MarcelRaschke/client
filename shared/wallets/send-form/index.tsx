import * as Container from '../../util/container'
import * as Kb from '../../common-adapters'
import * as RouteTreeGen from '../../actions/route-tree-gen'
import * as Styles from '../../styles'
import * as WalletsGen from '../../actions/wallets-gen'
import Root from './root'
import SendBodyAdvanced from './body/advanced'
import {SendBody, RequestBody} from './body/container'

type OwnProps = Container.RouteProps<'sendReceiveForm'>

export default (ownProps: OwnProps) => {
  const isRequest = Container.useSelector(state => state.wallets.building.isRequest)
  const dispatch = Container.useDispatch()
  const isAdvanced = ownProps.route.params?.isAdvanced ?? false
  const onBack = isAdvanced
    ? () => dispatch(RouteTreeGen.createNavigateUp())
    : Container.isMobile
    ? () => dispatch(WalletsGen.createAbandonPayment())
    : null
  const onClose = () => {
    dispatch(WalletsGen.createAbandonPayment())
  }
  const props = {
    isAdvanced: ownProps.route.params?.isAdvanced ?? false,
    isRequest,
    onBack,
    onClose,
  }
  return <SendRequestForm {...props} />
}

type Props = {
  isRequest: boolean
  isAdvanced: boolean
  onBack: (() => void) | null
  onClose: () => void
}

const SendRequestForm = (props: Props) => (
  <Root
    isRequest={props.isRequest}
    onBack={props.onBack}
    onClose={props.onClose}
    showCancelInsteadOfBackOnMobile={!props.isAdvanced}
  >
    {props.isAdvanced ? (
      props.isRequest ? (
        <Kb.Text type="HeaderBig">Developer Error</Kb.Text>
      ) : (
        <SendBodyAdvanced />
      )
    ) : props.isRequest ? (
      <RequestBody />
    ) : (
      <SendBody />
    )}
  </Root>
)

export const options = {
  safeAreaStyle: {
    backgroundColor: Styles.globalColors.purpleDark,
  },
}
