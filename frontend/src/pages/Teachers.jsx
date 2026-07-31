import useFetch from "../hooks/useFetch";
import useToast from "../hooks/useToast";
import useDebounce from "../hooks/useDebounce";
import {
    getTeachers,
    deleteTeacher
} from "../services/teacherService";
import TeacherForm from "../components/teachers/TeacherForm";
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal/ConfirmDeleteModal";
import PageTitle from "../components/ui/PageTitle";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import SearchInput from "../components/ui/SearchInput/SearchInput";
import Pagination from "../components/ui/Pagination/Pagination";
import useCrud from "../hooks/useCrud";
import CrudTable from "../components/ui/CrudTable/CrudTable";

function Teachers() {

    const crud = useCrud();

    const { showToast } = useToast();

    const debouncedSearch = useDebounce(crud.search);


    const {

        data: teacherData,

        loading,

        error,

        refetch

    } = useFetch(

       () => getTeachers(

    debouncedSearch,

    crud.page,

    crud.ordering

),
[
    debouncedSearch,
    crud.page,
    crud.ordering
]

    );

  

    function handleEdit(teacher) {

    crud.startEdit(teacher);

}

 function handleDelete(teacher) {

    crud.openDelete(teacher);

}

    async function confirmDelete() {

        try {

           await deleteTeacher(crud.selectedItem.id);
            showToast(

                "Teacher Deleted Successfully",

                "success"

            );

            refetch();

        }

        catch (error) {

            console.log(error);

            showToast(

                "Failed to Delete Teacher",

                "error"

            );

        }

        finally {

    crud.closeDelete();

}

    }


    if (loading) {

        return (

            <Loader

                text="Loading Teachers..."

            />

        );

    }

    if (error) {

        return (

            <Alert type="error">

                Failed to load teachers.

            </Alert>

        );

    }

    const totalPages = Math.ceil(

        (teacherData?.count || 0) / 5

    );

    return (

        <>

            <PageTitle

                title="Teachers"

                subtitle="Manage all teachers"

            />

            <TeacherForm

                          editingTeacher={crud.editingItem}

                          setEditingTeacher={crud.setEditingItem}

                         onTeacherAdded={refetch}

            />

            <Card>

             <SearchInput
                  value={crud.search}
                     onChange={(e) =>
                           crud.handleSearch(e.target.value)
                     }
                           placeholder="Search teachers..."
               />

                <br />

                {

                    teacherData?.results?.length === 0 ? (

                        <p>

                            No Teachers Found.

                        </p>

                    ) : (

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
            key: "subject",
            label: "Subject"
        }
    ]}
                   data={teacherData?.results || []}
                   loading={loading}
                   error={error}
                   emptyMessage="No Teachers Found."
                   sortField={crud.ordering}
                   onSort={crud.handleSort}
                   onEdit={handleEdit}
                   onDelete={handleDelete}
/>               

                    )

                }

                <Pagination

                    currentPage={crud.page}

                    totalPages={totalPages}

                    onPageChange={crud.setPage}

                />

            </Card>

            <ConfirmDeleteModal
                     isOpen={crud.isDeleteModalOpen}
                      item={crud.selectedItem}
                      itemName="Teacher"
                       onConfirm={confirmDelete}
                       onCancel={crud.closeDelete}
             />
        </>

    );

}

export default Teachers;