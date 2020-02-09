import React from 'react';

const ColorModeContext = React.createContext(null);

const useColorModeContext = () => React.useContext(ColorModeContext);

export { ColorModeContext, useColorModeContext };
