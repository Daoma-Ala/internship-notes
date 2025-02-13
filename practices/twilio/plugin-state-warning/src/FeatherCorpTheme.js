// archivo: src/FeatherCorpTheme.js

// colores de marca
const cTangerine = 'HSL(26, 91%, 55%)';
const cTangerineLight = 'HSL(26, 91%, 93%)'; // versión más clara de cTangerine
const cSolitude = 'HSL(230, 16%, 93%)';
const lightTheme = true;

export default {
  light: lightTheme,
  baseName: 'GreyLight',

  // colores base del tema
  colors: {
    tabSelectedColor: cTangerine,
    focusColor: cTangerine,
    completeTaskColor: cTangerine,
    defaultButtonColor: cTangerine,
    flexBlueColor: cTangerine
  },

  // sobrescrituras de componentes
  overrides: {

    // encabezado superior
    MainHeader: {
      Container: {
        background: cTangerine,
        color: cSolitude
      }
    },

    // barra lateral izquierda
    SideNav: {
      Container: {
        background: cSolitude,
        color: cTangerine
      },
      Button: {
        background: cSolitude,
        color: cTangerine,
        lightHover: !lightTheme
      },
      Icon: {
        color: cTangerine
      }
    },

    // plugin de administración
    FlexAdmin: {
      DashboardCard: {
        Icon: {
          backgroundColor: cTangerineLight
        }
      }
    }
  }
};