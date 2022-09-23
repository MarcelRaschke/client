function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { // View,
requireNativeComponent, UIManager, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-drop-view' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const ComponentName = 'DropView'; // const isSupported = Platform.OS === 'ios'

const IMPL = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};

const DropViewWrapper = p => {
  const {
    onDropped
  } = p;
  const onDroppedCB = React.useCallback(e => {
    const manifest = e.nativeEvent.manifest;
    const cleanedUp = manifest.reduce((arr, item) => {
      if (item.originalPath || item.content) {
        arr.push(item);
      }

      return arr;
    }, new Array());
    onDropped(cleanedUp);
  }, [onDropped]); // @ts-ignore

  return /*#__PURE__*/React.createElement(IMPL, _extends({}, p, {
    onDropped: onDroppedCB
  }));
}; // export default isSupported ? DropViewWrapperIOS : View


export default DropViewWrapper;
//# sourceMappingURL=index.js.map