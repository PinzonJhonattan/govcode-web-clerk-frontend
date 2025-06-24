import { mergeDeep } from "../utils/merge-deep";
import { VexConfigName } from "./config-name.model";
import { VexConfig } from "./vex-config.interface";
import { ColorSchemeName } from "./colorSchemeName";
import { colorVariables } from "../components/config-panel/color-variables";

const defaultConfig: VexConfig = {
  id: VexConfigName.apollo,
  name: "Apollo",
  style: {
    colorScheme: ColorSchemeName.default,
    colors: {
      primary: colorVariables.primary
    },
    borderRadius: {
      value: 0.25,
      unit: "rem"
    },
    button: {
      borderRadius: undefined
    }
  },
  direction: "ltr",
  imgSrc: "/assets/img/logo_zipa_letras blancas.png",
  layout: "horizontal",
  boxed: false,
  sidenav: {
    title: "",
    imageUrl: "/assets/img/logo_zipa_letras blancas.png",
    showCollapsePin: true,
    user: {
      visible: true
    },
    search: {
      visible: true
    },
    state: "expanded"
  },
  toolbar: {
    fixed: true,
    user: {
      visible: true
    }
  },
  navbar: {
    position: "below-toolbar"
  },
  footer: {
    visible: false,
    fixed: true
  }
};

export const configs: VexConfig[] = [
  defaultConfig,
  mergeDeep(
    { ...defaultConfig },
    {
      id: VexConfigName.poseidon,
      name: "Poseidon",
      imgSrc: "/assets/img/logo_zipa_letras blancas.png",
      style: {
        borderRadius: {
          value: 0.5,
          unit: "rem"
        },
        button: {
          borderRadius: {
            value: 9999,
            unit: "px"
          }
        }
      },
      sidenav: {
        user: {
          visible: true
        },
        search: {
          visible: true
        }
      },
      toolbar: {
        user: {
          visible: false
        }
      },
      footer: {
        fixed: false
      }
    }
  ),
  mergeDeep(
    { ...defaultConfig },
    {
      id: VexConfigName.hermes,
      name: "Hermes",
      imgSrc: "/assets/img/logo_zipa_letras blancas.png",
      layout: "vertical",
      boxed: true,
      sidenav: {
        user: {
          visible: false
        },
        search: {
          visible: false
        }
      },
      toolbar: {
        fixed: false
      },
      footer: {
        fixed: false
      }
    }
  ),
  mergeDeep(
    { ...defaultConfig },
    {
      id: VexConfigName.ares,
      name: "Ares",
      imgSrc: "/assets/img/logo_zipa_letras blancas.png",
      sidenav: {
        user: {
          visible: false
        },
        search: {
          visible: false
        }
      },
      toolbar: {
        fixed: false
      },
      navbar: {
        position: "in-toolbar"
      },
      footer: {
        fixed: false
      }
    }
  ),
  mergeDeep(
    { ...defaultConfig },
    {
      id: VexConfigName.zeus,
      name: "Zeus",
      imgSrc: "/assets/img/logo_zipa_letras blancas.png",
      sidenav: {
        state: "collapsed"
      }
    }
  ),
  mergeDeep(
    { ...defaultConfig },
    {
      id: VexConfigName.ikaros,
      name: "Ikaros",
      imgSrc: "/assets/img/logo_zipa_letras blancas.png",
      layout: "vertical",
      boxed: true,
      sidenav: {
        user: {
          visible: false
        },
        search: {
          visible: false
        }
      },
      toolbar: {
        fixed: false
      },
      navbar: {
        position: "in-toolbar"
      },
      footer: {
        fixed: false
      }
    }
  )
];
