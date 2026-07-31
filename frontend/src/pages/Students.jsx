import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useToast from "../hooks/useToast";
import useDebounce from "../hooks/useDebounce";
import StudentForm from "../components/students/StudentForm";
import Pagination from "../components/ui/Pagination/Pagination";
import { getTeachers } from "../services/teacherService";
import useCrud from "../hooks/useCrud";
import CrudToolbar from "../components/ui/CrudToolbar/CrudToolbar";
import CrudPage from "../layouts/CrudPage/CrudPage";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal/ConfirmDeleteModal";
import CrudTable from "../components/ui/CrudTable/CrudTable";


import {
    getStudents,
    deleteStudent
} from "../services/studentService";

function Students() {

   const crud = useCrud();
    const { showToast } = useToast();
    const debouncedSearch = useDebounce(crud.search);
    const [teacherFilter, setTeacherFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState("");

    const {

        data: studentData,

        loading,

        error,

        refetch

    } = useFetch(

        () => getStudents(

                debouncedSearch,

                crud.page,

                crud.ordering,

                teacherFilter,

                ageFilter

       ),

                        [

                           debouncedSearch,

                           crud.page,

                           crud.ordering,

                           teacherFilter,

                           ageFilter

                                     ]

    );
   const {

    data: teacherData

} = useFetch(getTeachers);




    // ===========================
    // Edit
    // ===========================

        function handleEdit(student) {

             crud.startEdit(student);

       }

    // ===========================
    // Delete
    // ===========================

    function handleDelete(student) {

             crud.openDelete(student);

    }

    async function confirmDelete() {

        try {

           await deleteStudent(crud.selectedItem.id);

            showToast(

                "Student Deleted Successfully",

                "success"

            );

            refetch();

        }

        catch (error) {

            console.log(error);

            showToast(

                "Failed to Delete Student",

                "error"

            );

        }

        finally {

            crud.closeDelete();

        }

    }

    

    const totalPages = Math.ceil(

        (studentData?.count || 0) / 5

    );

    return (

        <>

            <CrudPage

    title="Students"

    subtitle="Manage all students"

    form={

        <StudentForm

            editingStudent={crud.editingItem}

            setEditingStudent={crud.setEditingItem}

            onStudentAdded={refetch}

        />

    }

>

            

                <CrudToolbar

    search={crud.search}

    onSearch={crud.handleSearch}

    filters={[

        {

            name: "teacher",

            label: "Teacher",

            value: teacherFilter,

            defaultOption: "All Teachers",

            options:

                teacherData?.results

                    ? teacherData.results.map((teacher) => ({

                        value: teacher.id,

                        label: teacher.name

                    }))

                    : teacherData?.map((teacher) => ({

                        value: teacher.id,

                        label: teacher.name

                    })) || [],

            onChange: (e) => {

                setTeacherFilter(e.target.value);

                crud.setPage(1);

            }

        },

        {

            name: "age",

            label: "Age",

            value: ageFilter,

            defaultOption: "All Ages",

            options: Array.from(

                { length: 13 },

                (_, i) => ({

                    value: String(i + 18),

                    label: String(i + 18)

                })

            ),

            onChange: (e) => {

                setAgeFilter(e.target.value);

                crud.setPage(1);

            }

        }

    ]}

/>
                      <br />
             
                <br />

                <CrudTable
    columns={[
        {
            key: "id",
            label: "ID"
        },
        {
            key: "name",
            label: "Name"
        },
        {
            key: "age",
            label: "Age"
        },
        {
            key: "teacher_name",
            label: "Teacher"
        }
    ]}
                  data={studentData?.results || []}
                  loading={loading}
                  error={error}
                  emptyMessage="No Students Found."
                  sortField={crud.ordering}
                  onSort={crud.handleSort}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
/>


                <Pagination

                    currentPage={crud.page}

                    totalPages={totalPages}

                    onPageChange={crud.setPage}

                />

            </CrudPage>

           <ConfirmDeleteModal

                      isOpen={crud.isDeleteModalOpen}

                      item={crud.selectedItem}

                      itemName="Student"

                      onConfirm={confirmDelete}

                      onCancel={crud.closeDelete}

            />                  

        </>

    );

}

export default Students;