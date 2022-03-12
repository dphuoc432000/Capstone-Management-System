import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function SMTypeModel(onEdit,onDelete,onSave,onClose)
{
  return [
    { field: "id", headerName: "ID", width: 90 }, // sdfeu-1df3-fa
    {
      field: "fullName",
      headerName: "Full name",
      width: 200,
      editable: true,
    },
    {
      field: "studentID",
      headerName: "Student ID",
      width: 140,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 140,
      editable: true,
    },
    {
      field: "gpa",
      headerName: "GPA",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "capstoneType",
      headerName: "Capstone Type",
      width: 170,
      editable: true,
    },
    {
      field: "codingLevel",
      headerName: "Coding Level",
      width: 170,
      editable: true,
    },
    {
      field: "remainCredits",
      headerName: "Remaining Credits",
      type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "isInternship",
      headerName: "Had an internship",
      type: "boolean",
      width: 140,
      editable: true,
    },
    {
      field: "isApproved",
      headerName: "Approved",
      type: "boolean",
      width: 140,
      editable: true,
    },
    {
      field: "toolbar",
      headerName: "Toolbar",
      width: 140,
      renderCell: () => (
        <div>
          <ModeEditOutlineOutlinedIcon onClick={onEdit} /> <DeleteOutlineOutlinedIcon onClick={onDelete} />
        </div>
      ),
      renderEditCell: () => (
        <div>
          <SaveOutlinedIcon onClick={onSave} /> <CloseOutlinedIcon onClick={onClose} />
        </div>
      ),
      editable: true,
    },
  ];
}

export default SMTypeModel;
