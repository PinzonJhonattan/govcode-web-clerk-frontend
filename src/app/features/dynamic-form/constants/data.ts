export const formData = {
  "components": [
    {
      "text": "# Radicar ss\n## Titutlo 2\n### Titulo 3\n#### Titulo 4\n##### Titulo 5\n###### Titulo 6\nestos campos son obligatorios\nsiga los siguientes pasos\n* paso 1 : llenar el nombre\n* paso 2 : ssssssss",
      "label": "Text view",
      "type": "text",
      "layout": {
        "row": "Row_1pif646",
        "columns": null
      },
      "id": "Field_1pdplhv",
      "properties": {
        "type": "markdown"
      },
      "conditional": {
        "hide": "=field_1sdc536 = 11"
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0q208ue",
        "columns": null
      },
      "id": "Field_1cm2vcp",
      "key": "field_1ne606z"
    },
    {
      "text": "dynamic section",
      "label": "Text view",
      "type": "text",
      "layout": {
        "row": "Row_0n9s2ck",
        "columns": null
      },
      "id": "Field_1xtzuu5",
      "properties": {
        "type": "startDynamicSection",
        "limitSections": "15",
        "key": "predios",
        "titleSection" : `Predio \${index}`,
        "addButtonText" : "Añadir Predio",
        "removeButtonText" : "Eliminar Predio"
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0k2y7x3",
        "columns": null
      },
      "validate": {
        "required": true
      },
      "id": "Field_0nuwyq6",
      "key": "field_1tld9qs"
    },
    {
      "values": [
        {
          "label": "Value",
          "value": "value"
        }
      ],
      "validate": {
        "required": true
      },
      "label": "Select",
      "type": "select",
      "layout": {
        "row": "Row_0k2y7x3",
        "columns": null
      },
      "conditional": {
        "hide": "=field_1tld9qs = \"hola\""
      },
      "id": "Field_1dh28dg",
      "key": "field_0yv44a9qs"
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0k2y7x3",
        "columns": null
      },
      "conditional": {
        "hide": "=field_0yv44a9qs = \"s\" and field_1tld9qs = \"a\""
      },
      "id": "Field_1dkezk3",
      "key": "field_1l1xrm5"
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0v2z4dj",
        "columns": null
      },
      "id": "Field_1h9rnhh",
      "key": "field_0bknqfa"
    },
    {
      "text": "end dynamic section",
      "label": "Text view",
      "type": "text",
      "layout": {
        "row": "Row_1608u1v",
        "columns": null
      },
      "id": "Field_0i11c5u",
      "properties": {
        "type": "endDynamicSection"
      }
    },
    {
      "text": "Dynamic Table",
      "label": "Text view",
      "type": "text",
      "layout": {
        "row": "Row_1e097h8",
        "columns": 16
      },
      "id": "Field_0afmg82",
      "properties": {
        "type": "dynamicTable",
        "columns": "Número,Volumen (L),Tiempo (S)",
        "key": "caudal",
        "nameIndexColumn": "Posición",
        "limitRows": "10"
      },
      "conditional": {
        "hide": "=field_1ne606z = \"ho\""
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0ex5kyd",
        "columns": null
      },
      "id": "Field_0bud4gt",
      "key": "field_0rixt8d",
      "validate": {
        "required": true
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0ex5kyd",
        "columns": null
      },
      "id": "Field_0eoz7ta",
      "key": "field_17ghdqa"
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0ex5kyd",
        "columns": null
      },
      "id": "Field_0tfkac4",
      "key": "field_0bi5375",
      "properties": {
        "equation": "field_0rixt8ds * field_17ghdqa + 5.2",
        "type": "resultCalc",
        "key3": "value"
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_07ecqju",
        "columns": null
      },
      "id": "Field_0t7iwoh",
      "key": "field_14irrnq",
      "properties": {
        "type": "resultTable",
        "title": "Caudal Total (L/S)",
        "equation": "value"
      }
    },
    {
      "label": "Valor 1",
      "type": "number",
      "layout": {
        "row": "Row_0pgzkvx",
        "columns": null
      },
      "id": "Field_0hic5pz",
      "key": "fecha_año",
      "properties": {
        "type": "number"
      }
    },
    {
      "label": "Valor 2",
      "type": "textfield",
      "layout": {
        "row": "Row_0pgzkvx",
        "columns": null
      },
      "id": "Field_1o4xz86",
      "key": "field_1dx8qpd",
      "properties": {
        "type": "number"
      }
    },
    {
      "label": "Valor 3",
      "type": "number",
      "layout": {
        "row": "Row_0pgzkvx",
        "columns": null
      },
      "id": "Field_1i4m1hi",
      "key": "field_1kmyk0c",
      "properties": {
        "type": "number"
      }
    },
    {
      "label": "Resultado",
      "type": "textfield",
      "layout": {
        "row": "Row_0pgzkvx",
        "columns": null
      },
      "id": "Field_1tw15ey",
      "key": "field_0qf185g",
      "properties": {
        "type": "resultCalc",
        "equation": "((fecha_año - 5.11)  /  ( field_1dx8qpd  % 5))  + field_1kmyk0c"
      }
    },
    {
      "values": [
        {
          "label": "CC",
          "value": "cc"
        },
        {
          "label": "TI",
          "value": "ti"
        },
        {
          "label": "PP",
          "value": "pp"
        },
        {
          "label": "NIT",
          "value": "nit"
        }
      ],
      "label": "Select Identificacion",
      "type": "select",
      "layout": {
        "row": "Row_08dgl41",
        "columns": null
      },
      "id": "Field_11bqepv",
      "key": "field_1cxc38l",
      "properties": {
        "type": "select"
      },
      "validate": {
        "required": true
      },
      "searchable": true
    },
    {
      "label": "Campo bandera",
      "type": "textfield",
      "layout": {
        "row": "Row_08dgl41",
        "columns": null
      },
      "id": "Field_1c0q3e2",
      "key": "field_0r9pvfx",
      "properties": {
        "groupBy": "identificacion"
      }
    },
    {
      "label": "Campo que se quiera aqui",
      "type": "textfield",
      "layout": {
        "row": "Row_08dgl41",
        "columns": null
      },
      "id": "Field_0r802qs",
      "key": "field_000nu83"
    },
    {
      "label": "Cedula",
      "type": "textfield",
      "layout": {
        "row": "Row_035nytc",
        "columns": null
      },
      "id": "Field_0m9j0ud",
      "key": "field_0s23l31",
      "conditional": {
        "hide": "=field_1cxc38l != \"CC\""
      },
      "properties": {
        "groupName": "identificacion"
      }
    },
    {
      "label": "Tarjeta Identidad",
      "type": "textfield",
      "layout": {
        "row": "Row_035nytc",
        "columns": null
      },
      "id": "Field_15u9vk0",
      "key": "field_1mgrpy3",
      "conditional": {
        "hide": "=field_1cxc38l != \"TI\""
      },
      "properties": {
        "groupName": "identificacion"
      },
      "validate": {
        "required": true
      }
    },
    {
      "label": "NIT",
      "type": "textfield",
      "layout": {
        "row": "Row_035nytc",
        "columns": null
      },
      "id": "Field_1i9z2os",
      "key": "field_1aaj29i",
      "conditional": {
        "hide": "=field_1cxc38l != \"NIT\" or \nfield_1hvhcgv = \"hola\""
      },
      "properties": {
        "groupName": "identificacion"
      }
    },
    {
      "label": "Pasaporte",
      "type": "textfield",
      "layout": {
        "row": "Row_035nytc",
        "columns": null
      },
      "id": "Field_14vnzki",
      "key": "field_1ww1mzo",
      "conditional": {
        "hide": "=field_1cxc38l != \"PP\""
      },
      "properties": {
        "groupName": "identificacion"
      }
    },
    {
      "label": "Otra identificacion",
      "type": "textfield",
      "layout": {
        "row": "Row_08qof79",
        "columns": null
      },
      "id": "Field_0lctn2l",
      "key": "field_0icsg5y",
      "properties": {
        "groupName": "identificacion"
      },
      "conditional": {
        "hide": "=field_1cxc38l != \"TU\""
      }
    },
    {
      "label": "Quizas otra identificacion",
      "type": "textfield",
      "layout": {
        "row": "Row_08qof79",
        "columns": null
      },
      "id": "Field_0pdyvpt",
      "key": "field_1lr28qk",
      "properties": {
        "groupName": "identificacion"
      },
      "conditional": {
        "hide": "=field_1cxc38l != \"TY\""
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_1akwn79",
        "columns": null
      },
      "id": "Field_084ngcf",
      "key": "field_18cwwxr"
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_1akwn79",
        "columns": null
      },
      "id": "Field_0mr0d4e",
      "key": "field_1loqvgm"
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_1ljlvro",
        "columns": 5
      },
      "id": "Field_1g56rnp",
      "key": "field_1goiq8v"
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0aeb4zq",
        "columns": null
      },
      "id": "Field_1kucj39",
      "key": "field_1sdc536",
      "description": "Ejem juanitos",
      "validate": {
        "required": true
      },
      "properties": {
        "type": "currency"
      }
    },
    {
      "label": "SSS",
      "type": "textfield",
      "layout": {
        "row": "Row_0aeb4zq",
        "columns": null
      },
      "id": "Field_135ws5v",
      "key": "field_0f06l65"
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0aeb4zq",
        "columns": null
      },
      "id": "Field_1c9snuc",
      "key": "field_0g3lxdg",
      "conditional": {
        "hide": "=field_1sdc536 = 1"
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0229kwv",
        "columns": 6
      },
      "id": "Field_15y5yzp",
      "key": "field_1ixzvhx"
    },
    {
      "label": "Number",
      "type": "number",
      "layout": {
        "row": "Row_0229kwv",
        "columns": null
      },
      "id": "Field_0iu65bl",
      "key": "field_0v5a0v9",
      "properties": {
        "type": "number"
      },
      "validate": {
        "required": true
      }
    },
    {
      "text": "Datos personales",
      "label": "Text view",
      "type": "text",
      "layout": {
        "row": "Row_13fmuv6",
        "columns": null
      },
      "id": "Field_0ufjlj3",
      "properties": {
        "type": "tab"
      }
    },
    {
      "label": "Number",
      "type": "number",
      "layout": {
        "row": "Row_1evlfxp",
        "columns": null
      },
      "id": "Field_0aw8h89",
      "key": "field_1eg5f9u",
      "properties": {
        "type": "currency"
      },
      "validate": {
        "min": 50000,
        "max": 200000,
        "required": true
      },
      "conditional": {
        "hide": "=field_0v5a0v9 <= 5"
      }
    },
    {
      "label": "Nombre",
      "type": "textfield",
      "layout": {
        "row": "Row_1evlfxp",
        "columns": 5
      },
      "id": "Field_1ndagt4",
      "key": "field_0ia38fe",
      "properties": {
        "type": "text"
      },
      "validate": {
        "minLength": 3,
        "maxLength": 7,
        "required": true
      },
      "description": "Ingrese su nombre",
      "disabled": false,
      "readonly": false,
      "defaultValue": "Bogotá",
      "conditional": {
        "hide": "=field_0v5a0v9 = 0"
      }
    },
    {
      "label": "Edad",
      "type": "number",
      "layout": {
        "row": "Row_090jio8",
        "columns": null
      },
      "id": "Field_0y21uyi",
      "key": "field_0hhktj7",
      "validate": {
        "min": 7,
        "max": 8,
        "required": true
      },
      "properties": {
        "type": "number"
      },
      "description": "Ingrese su edad",
      "defaultValue": 8,
      "conditional": {
        "hide": "=field_1sdc536 = 22"
      }
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0168nkd",
        "columns": null
      },
      "id": "Field_0lf1vpk",
      "key": "field_1cszvza",
      "properties": {
        "groupBy": "value"
      }
    },
    {
      "label": "Prueba1",
      "type": "textfield",
      "layout": {
        "row": "Row_0168nkd",
        "columns": null
      },
      "id": "Field_0ei78gz",
      "key": "field_0csqe56",
      "properties": {
        "groupBy": "prueba"
      },
      "conditional": {
        "hide": "=field_1cszvza = false"
      }
    },
    {
      "label": "Prueba2",
      "type": "textfield",
      "layout": {
        "row": "Row_0168nkd",
        "columns": null
      },
      "id": "Field_13ig01w",
      "key": "field_0644f2d",
      "properties": {
        "groupName": "prueba"
      },
      "conditional": {
        "hide": "=field_1cszvza = \"hola2\""
      }
    },
    {
      "text": "Datos del solicitante",
      "label": "Text view",
      "type": "text",
      "layout": {
        "row": "Row_0lc7dzv",
        "columns": null
      },
      "id": "Field_1erwup5",
      "properties": {
        "type": "tab"
      }
    },
    {
      "label": "Descripción",
      "type": "textfield",
      "layout": {
        "row": "Row_1mtt40a",
        "columns": null
      },
      "id": "Field_0ap21i3",
      "key": "field_1qcd9ta",
      "validate": {
        "minLength": 4,
        "required": true
      },
      "description": "Ingrese la descripción",
      "properties": {
        "type": "text"
      },
      "defaultValue": "hola"
    },
    {
      "label": "Text field1",
      "type": "textfield",
      "layout": {
        "row": "Row_1mtt40a",
        "columns": null
      },
      "id": "Field_19gu8l4",
      "key": "field_0u70y5j",
      "properties": {
        "type": "text"
      },
      "conditional": {
        "hide": "=field_1qcd9ta = \"hola\"\n"
      },
      "validate": {
        "required": true
      }
    },
    {
      "label": "Text area",
      "type": "textarea",
      "layout": {
        "row": "Row_1pfcoln",
        "columns": null
      },
      "id": "Field_1gw3pj8",
      "key": "field_13f4fot",
      "defaultValue": "Las concesiones forestales, dependen de un minimo de agua.",
      "properties": {
        "type": "textarea"
      }
    },
    {
      "text": "Datos de localización",
      "label": "Text view",
      "type": "text",
      "layout": {
        "row": "Row_1n4zwha",
        "columns": null
      },
      "id": "Field_1y9rs92",
      "properties": {
        "type": "tab"
      }
    },
    {
      "label": "Latitud",
      "type": "textfield",
      "layout": {
        "row": "Row_0bj9e43",
        "columns": null
      },
      "id": "Field_1c7nimg",
      "key": "field_1tbyl2h",
      "description": "Ingrese la latitud",
      "validate": {
        "required": true
      }
    },
    {
      "label": "Longitud",
      "type": "textfield",
      "layout": {
        "row": "Row_0bj9e43",
        "columns": null
      },
      "id": "Field_01jh3sc",
      "key": "field_1g0895s",
      "description": "Ingrese longitud",
      "validate": {
        "required": true
      }
    },
    {
      "subtype": "date",
      "dateLabel": "Date",
      "label": "Date time",
      "type": "datetime",
      "layout": {
        "row": "Row_1p38hl6",
        "columns": null
      },
      "id": "Field_1vah3ms",
      "key": "field_16618yw",
      "properties": {
        "type": "datepicker"
      }
    },
    {
      "values": [
        {
          "label": "Cárro Montañero",
          "value": "car"
        },
        {
          "label": "Motor",
          "value": "motor"
        }
      ],
      "label": "Select",
      "type": "select",
      "layout": {
        "row": "Row_11zpdkk",
        "columns": null
      },
      "id": "Field_1uth241",
      "key": "field_05jqmnd",
      "properties": {
        "type": "select"
      },
      "validate": {
        "required": true
      },
      "searchable": false,
      "description": "Seleccione un vehiculo",
      "defaultValue": "car"
    },
    {
      "values": [
        {
          "label": "Car ssss",
          "value": "car1"
        },
        {
          "label": "Bicicleta",
          "value": "bycicle"
        }
      ],
      "label": "Select",
      "type": "select",
      "layout": {
        "row": "Row_11zpdkk",
        "columns": null
      },
      "id": "Field_1vv9xjd",
      "key": "field_1g8aigh",
      "description": "Seleccione un valor",
      "searchable": true,
      "validate": {
        "required": true
      },
      "properties": {
        "type": "select"
      },
      "defaultValue": "car1",
      "conditional": {
        "hide": "=field_05jqmnd = \"Motor\""
      }
    },
    {
      "label": "Documento de Identidad",
      "type": "textfield",
      "layout": {
        "row": "Row_1ijsuvh",
        "columns": null
      },
      "id": "Field_1lszb10",
      "key": "field_0lkrjyl",
      "properties": {
        "type": "uploadFile",
        "limitSize": "200KB",
        "allowExtensions": "jpg,jpeg,png,pdf"
      },
      "description": "Archivos de tipo JPG,PDF,PNG. Peso máximo : 2mb. ",
      "validate": {
        "required": true
      },
      "readonly": false,
      "disabled": false
    },
    {
      "label": "Rellene los campos",
      "type": "checkbox",
      "layout": {
        "row": "Row_0hec5wp",
        "columns": null
      },
      "id": "Field_08ov1cc",
      "key": "field_17djb85",
      "validate": {
        "required": true
      },
      "description": "ssssss",
      "defaultValue": false,
      "properties": {
        "type": "checkbox"
      },
      "disabled": false,
      "conditional": {
        "hide": "=field_05jqmnd != \"Cárro Montañero\""
      }
    },
    {
      "values": [
        {
          "label": "Value",
          "value": "value"
        },
        {
          "label": "Value 2",
          "value": "value2"
        },
        {
          "label": "Value 3",
          "value": "value3"
        },
        {
          "label": "Value 4",
          "value": "value4"
        }
      ],
      "label": "Checklist",
      "type": "checklist",
      "layout": {
        "row": "Row_0tx2las",
        "columns": null
      },
      "id": "Field_1jx1cqf",
      "key": "f",
      "description": "Rellene estos checkbox",
      "validate": {
        "required": true
      },
      "properties": {
        "type": "checkboxList",
        "numColumns": "1"
      },
      "conditional": {
        "hide": "=field_17djb85 = true"
      },
      "readonly": false
    },
    {
      "values": [
        {
          "label": "Si",
          "value": "Si"
        },
        {
          "label": "No",
          "value": "No"
        }
      ],
      "label": "Radio",
      "type": "radio",
      "layout": {
        "row": "Row_1mok52s",
        "columns": 8
      },
      "id": "Field_1k8whz8",
      "key": "field_0fhfldn",
      "defaultValue": "values1",
      "properties": {
        "type": "radioList",
        "numColumns": "2"
      },
      "validate": {
        "required": true
      }
    },
    {
      "label": "Visor de archivos",
      "type": "textfield",
      "layout": {
        "row": "Row_0ous8qd",
        "columns": null
      },
      "id": "Field_0hgg2d4",
      "key": "field_10x5h0s",
      "properties": {
        "type": "viewerFile",
        "url": "Task/binary/a4ac67d6-4772-11ee-9edb-0242ac120009/field_0lkrjyl"
      },
      "conditional": {
        "hide": "=field_0fhfldn != \"No\""
      }
    },
    {
      "values": [
        {
          "label": "Si",
          "value": "Si"
        },
        {
          "label": "No",
          "value": "No"
        }
      ],
      "label": "¿Aprueba revisión?",
      "type": "radio",
      "layout": {
        "row": "Row_1180nks",
        "columns": null
      },
      "id": "Field_0syt97h",
      "key": "AprReg",
      "properties": {
        "type": "radioList",
        "numColumns": "2"
      },
      "validate": {
        "required": true
      }
    },
    {
      "label": "Observaciones revisión",
      "type": "textarea",
      "layout": {
        "row": "Row_0mm8n7z",
        "columns": null
      },
      "id": "Field_0ie8z3p",
      "key": "ObvsRevRadi",
      "properties": {
        "type": "textarea",
        "rows": "2"
      },
      "conditional": {
        "hide": "=AprReg != \"No\""
      }
    },
    {
      "values": [
        {
          "label": "Value",
          "value": "value"
        }
      ],
      "label": "Select",
      "type": "select",
      "layout": {
        "row": "Row_0dim6x0",
        "columns": null
      },
      "id": "Field_13rpfk4",
      "key": "field_1x9e0l1",
      "properties": {
        "type": "select",
        "dynamic": "https://retoolapi.dev/2YUQYo/data"
      },
      "conditional": {
        "hide": "=field_17djb85 = true"
      }
    },
    {
      "type": "textfield",
      "layout": {
        "row": "Row_0lehmt8",
        "columns": 8
      },
      "id": "Field_08jkyz3",
      "key": "field_0m5qku10",
      "properties": {
        "type": "location"
      },
      "validate": {
        "required": true
      },
      "disabled": false,
      "readonly": false
    },
    {
      "label": "Text field",
      "type": "textfield",
      "layout": {
        "row": "Row_0lehmt8",
        "columns": 8
      },
      "id": "Field_1vvm0ox",
      "key": "field_04hg636"
    },
    {
      "action": "submit",
      "label": "Radicar",
      "type": "button",
      "layout": {
        "row": "Row_0xs58e8",
        "columns": 2
      },
      "id": "Field_1ttrm21",
      "key": "field_1rtmlod",
      "properties": {
        "type": "submit",
        "action": "completeTask"
      },
      "conditional": {
        "hide": "=true"
      }
    },
    {
      "action": "submit",
      "label": "Firmar",
      "type": "button",
      "layout": {
        "row": "Row_0xs58e8",
        "columns": 2
      },
      "id": "Field_1nd7rvn",
      "key": "field_1cq94kz",
      "properties": {
        "type": "submit",
        "action": "signDocument",
        "nameDocument": "oficio-aviso-alcaldia",
        "keyReplace": "tecnico-revisor"
      }
    }
  ],
  "type": "default",
  "typeForm": "tabs",
  "id": "demo_form_func",
  "exporter": {
    "name": "Camunda Modeler",
    "version": "5.12.1"
  },
  "executionPlatform": "Camunda Platform",
  "executionPlatformVersion": "7.19.0",
  "schemaVersion": 9
}
