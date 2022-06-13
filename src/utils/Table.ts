import { CSSProperties } from "@material-ui/styles"
import { Column, MaterialTableProps, Options } from "material-table"


const optionsTable: Options<any> = {
  search: false,
  selection: false,
  showTitle: false,
  toolbar: false,
  paging: true,
  headerStyle:{
    fontFamily: 'inherit',
    fontSize:14,
    paddingTop:5,
    paddingBottom:5,
    textAlign:"left",
    fontWeight:"bold"
  },
  rowStyle: {
    fontFamily: 'inherit',
    textAlign:"left",
    padding:0,
  },
}
const localizationTable = {
  pagination: {
    labelRowsSelect: 'filas',
    labelDisplayedRows: '{count} de {from}-{to}',
    firstTooltip: 'Primera Pagina',
    previousTooltip: 'Pagina Anterior',
    nextTooltip: 'Siguiente Pagina',
    lastTooltip: 'Ultima Pagina'
  },
  toolbar: {
      nRowsSelected: '{0} filas seleccionadas',
      searchPlaceholder: "Buscar"
  },
  header: {
      actions: 'Acciones'
  },
  body: {
      emptyDataSourceMessage: 'No hay datos',
      filterRow: {
          filterTooltip: 'Filtrar'
      }
  }
}

const headerStyle = {
  backgroundColor: '#edf2f7',
  color: '#4d7ca1',
  height: 10,
}
const cellStyle: any = {
  textAlign:"left",
  padding: "8px 12px"
}

export {
  optionsTable,
  localizationTable,
  headerStyle,
  cellStyle
}