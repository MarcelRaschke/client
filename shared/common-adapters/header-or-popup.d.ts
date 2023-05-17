import * as Styles from '../styles'
export type Props = {
  onCancel?: () => void
  onBack?: () => void
  style?: Styles.StylesCrossPlatform
}

export declare function HeaderOrPopupWithHeader<P>(WrappedComponent: P): P
declare function HeaderOrPopup<P>(WrappedComponent: P): P
export default HeaderOrPopup
