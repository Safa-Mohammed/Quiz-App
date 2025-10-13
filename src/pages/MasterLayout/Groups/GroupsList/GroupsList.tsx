import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { GROUPSENDPOINTS } from "../../../../services";
import Cookies from "js-cookie";
import { ModalHeader } from "../../../../components/ModalHeader/ModalHeader";
import { toast } from 'react-toastify';
import CreatableSelect from "react-select/creatable";
import Pagination from '../../../../components/Pagination/Pagination'
import NoDataPage from "../../../../components/NoData/NoData";
export default function GroupsList() {
const [isOpen, setIsOpen] = useState(false);
const [groups, setGroups] = useState<any[]>([]); 
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
const [groupName, setGroupName] = useState("");
const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
const [studentOptions, _setStudentOptions] = useState<any[]>([]);
const [options, setOptions] = useState<any[]>([]);        
const [selectedValues, setSelectedValues] = useState<any[]>([]); 
const [grpName, setGrpName] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;
const token = Cookies.get("accessToken");

type Group = {
  _id: string;
  name: string;
  max_students: number;
  students:string[]
};


const deleteGroup = async (id: string) => {
  try {
    await axios.delete(GROUPSENDPOINTS.DELETE(id), {
     headers: {
     Authorization: `Bearer ${token}`, 
  },
    });
    setGroups((prev) => prev.filter((g) => g._id !== id));
    toast.success("Group deleted successfully")
  } catch (error) {
    console.error("Failed to delete group:", error);
    toast.error("OOPS!!!!Some thing went wrong")
  }
};

const UpdateGroup = async (id: string, data: { name: string; students: string[] }) => {
  try {
    await axios.put(
      GROUPSENDPOINTS.UPDATE(id),
      data, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Group updated successfully");
    getAllGroups(); 
  } catch (error) {
    console.error("Failed to update group:", error);
    toast.error("OOPS!!!! Something went wrong");
  }
};

const CreateGroup = async (data: {name: string; students: string[] }) => {
  try {
    await axios.post(
      GROUPSENDPOINTS.CREATEGROUP,
      data, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Group Added successfully");
    getAllGroups(); 
  } catch (error) {
    console.error("Failed to Add group:", error);
    toast.error("OOPS!!!! Something went wrong");
  }
};


const getAllGroups = async (): Promise<void> => {
  try {
    const response = await axios.get(GROUPSENDPOINTS.GETALL, {
      headers: { Authorization: `Bearer ${token}`,
},
    });
    console.log("GROUPSSSSSSSSSSSSSSSSSSSSSSSSSS",response)
    setGroups(response.data);
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};
 
  const handleCreate = (inputValue: string) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions((prev) => [...prev, newOption]);
    setSelectedValues((prev) => [...prev, newOption]);
  };

useEffect(() => {
    getAllGroups();
  }, []);
const startIndex = (currentPage - 1) * itemsPerPage;
const visibleGroups = groups.slice(startIndex, startIndex + itemsPerPage);
return (
<div className="container mx-auto">
  <div className="flex justify-end mb-4">
    
  <button onClick={() => setIsOpen(true)} className="flex rounded-[5px] items-center gap-2 bg-white text-black font-semibold px-6 py-4 mb-4 rounded-[5px] border border-gray-300 hover:bg-[#FFEDDF] transition">

  <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center font-bold ">
    +
  </span>
  Add Group
  </button>

  {isOpen &&  (
  <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50">
    <div className="bg-white p-2 rounded-lg w-96 shadow-lg">
    <ModalHeader 
        title="Set up a new Group"
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
        CreateGroup({name: grpName,students: selectedValues})
        setIsOpen(false);
        }}
      />
     

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mt-2 ">
          Group Name
        </label>
        <input
      
          type="text"
          onChange={(e) => setGrpName(e.target.value)}

          className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#C5D86D] bg-[#FFEDDF]"
        />


        <label className="block text-sm font-medium text-gray-700 ">
          List Students
        </label>
      <CreatableSelect
  isMulti
  options={options}
  value={selectedValues}
  onChange={(newValue) => 
  setSelectedStudents([...newValue.map((item) => item.value)])
}
  onCreateOption={handleCreate}
  placeholder="Student List"
  styles={{
    control: (base, state) => ({
      ...base,
      backgroundColor: "#FFEDDF",      
      borderColor: state.isFocused ? "#FFEDDF" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #FFEDDF" : "none",
      "&:hover": {
        borderColor: "#C5D86D",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#FFEDDF"                    
        : state.isFocused
        ? "#f0f0f0"                     
        : "white",
      color: state.isSelected ? "black" : "black",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#FFEDDF",       
      color: "white",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "black",                   
      fontWeight: 600,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "black",
      ":hover": {
        backgroundColor: "#FFEDDF",
        color: "white",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#999",                    
    }),
  }}
/>

      {/* Display selected items */}
      <div className="mt-3 text-gray-800">
        <strong>Selected:</strong>{" "}
        {selectedValues.length > 0
          ? selectedValues.map((item) => item.label).join(", ")
          : "None"}
      </div>

      </div>

  <div className="flex justify-end gap-3 mt-6">
   

  <button

  onClick={() => {
  if (!grpName.trim()) {
    toast.error("Group name is required");
    return;
  }

  if (!selectedValues || selectedValues.length === 0) {
    toast.error("Please Enter at least one student");
    return;
  }

  CreateGroup({ name: grpName, students: selectedValues });
  setIsOpen(false)
}}

          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Save
  </button>
      

  <button
  onClick={() => {
    
    setIsOpen(false);
  }}
  className="px-4 py-2 bg-[#FFEDDF] text-[#070606] rounded hover:text-gray-700"
>
  Cancel
</button>



      </div>
    </div>
  </div>
       )}



</div>



<div className="px-6 py-4 rounded-[8px] border-2 border-gray-300">
   <h1 className="font-nunito font-medium text-lg mb-1 text-gray-800">Groups list</h1>

<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 p-4">
  {groups.length > 0 ? (
    visibleGroups.map((group) => (
      <div
        key={group._id}
        className="flex justify-between items-center rounded-[4px] border border-gray-400 p-4 shadow-sm hover:shadow-md transition-shadow"
      >
   
        <div>
          <h2 className="font-nunito font-bold text-lg mb-2">
            Group: {group.name}
          </h2>
          <p className="text-gray-600 text-sm">
            No. of students: {group.max_students}
          </p>
        </div>

   
    <div className="flex items-center gap-3">
  <button
    onClick={() => {
      setSelectedGroup(group);
      setGroupName(group.name); 
      setIsEditModalOpen(true);
     setSelectedStudents(group.students);
      
    }}
    className="text-gray-600 hover:text-blue-800 transition-colors"
  >
    <Edit size={20} />
  </button>

  <button
    onClick={() => {
      setSelectedGroup(group);
      setIsDeleteModalOpen(true);
    }}
    className="text-gray-600 hover:text-red-800 transition-colors"
  >
    <Trash2 size={20} />
  </button> 


{isEditModalOpen && selectedGroup && (
  <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50">
    <div className="bg-white p-4 rounded-lg w-96 shadow-lg">

      <ModalHeader
        title="Edit Group"
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={() => {
       const nameChanged = groupName !== selectedGroup.name;
       const studentsChanged =
      JSON.stringify(selectedStudents) !== JSON.stringify(selectedGroup.students);
      if (!nameChanged && !studentsChanged) {
      toast.info("No changes to save");
      return;
    }
          UpdateGroup(selectedGroup._id, {
            name: groupName,
            students: selectedStudents,
          });
          setIsEditModalOpen(false);
        }}
      />

      <div className="space-y-3 mt-3">
        <label className="block text-sm font-medium text-gray-700">Group Name</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#C5D86D] bg-[#FFEDDF]"
        />

        <label className="block text-sm font-medium text-gray-700">List Students</label>
        <CreatableSelect
          isMulti
          options={studentOptions.map((s) => ({
            value: s._id,
            label: s.name,
          }))}
          value={selectedStudents.map((id) => {
            const s = studentOptions.find((stu) => stu._id === id);
            return { value: id, label: s ? s.name : id };
          })}
          onChange={(newValue) =>
            setSelectedStudents(newValue.map((item) => item.value))
          }
          placeholder="List Students"
        />

        <div className="mt-3">
          <strong>Selected:</strong>{" "}
          {selectedStudents.length > 0 ? selectedStudents.join(", ") : "None"}
        </div>

        
      </div>

    <div className="flex justify-end gap-3 mt-6">
    <button
     onClick={() => {
    const nameChanged = groupName !== selectedGroup.name;
    const studentsChanged =
      JSON.stringify(selectedStudents) !== JSON.stringify(selectedGroup.students);

    if (!nameChanged && !studentsChanged) {
      toast.info("No changes to save");
      return;
    }

    UpdateGroup(selectedGroup._id, {
      name: groupName,
      students: selectedStudents,
    });
    setIsEditModalOpen(false);
  }}
  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
>
  Save
</button>


        <button
          onClick={() => setIsEditModalOpen(false)}
          className="px-4 py-2 bg-[#FFEDDF] text-[#070606] rounded hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


 {isDeleteModalOpen && selectedGroup && (
  <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50">
    <div className="bg-white p-2 rounded-lg w-96 shadow-lg text-center">
     <div className="flex flex-col border-b border-gray-300 ">
  

    <ModalHeader 
        title="Delete Group"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          console.log("Save changes for", selectedGroup._id);
          if (selectedGroup) deleteGroup(selectedGroup._id);
          setIsDeleteModalOpen(false);
        }}
     
      />
</div>
      <p className="text-gray-700 mt-4 mb-6">
        Are you sure you want to delete <strong>{selectedGroup.name}</strong>?
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      

        <button
  onClick={() => {
    if (selectedGroup) deleteGroup(group._id);
    setIsDeleteModalOpen(false);
  }}
  className="px-4 py-2 bg-[#FFEDDF] text-[#070606] rounded hover:text-gray-700"
>
  Delete
</button>
      </div>
    </div>
  </div>
)} 

</div>

      </div>
    ))
  ) : (
    <p className="text-gray-600 text-center col-span-full">No groups found</p>
  
  )}
</div>
{groups.length > 0 ? (
 <Pagination
        totalItems={groups.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />):<NoDataPage/>}
</div>
  
</div>
  )
}
