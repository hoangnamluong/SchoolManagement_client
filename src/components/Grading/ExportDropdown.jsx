import Dropdown from "react-bootstrap/Dropdown";

import ExportGradeCSV from "./ExportGradeCSV";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExportGradePDF from "./ExportGradePDF";

function ExportDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        bsPrefix="primary-outlined-btn outline-primary-outlined-btn"
        className="w-100"
      >
        Export
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="span" className="p-0">
          <ExportGradeCSV />
        </Dropdown.Item>
        <Dropdown.Item as="span" className="p-0">
          <ExportGradePDF />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ExportDropdown;
