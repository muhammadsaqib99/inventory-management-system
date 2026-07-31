import { useState } from "react";

function useCrud() {

  
    // Search
    

    const [search, setSearch] = useState("");

   
    // Pagination
   

    const [page, setPage] = useState(1);

   
    // Sorting
    

    const [ordering, setOrdering] = useState("");


    // Edit
   

    const [editingItem, setEditingItem] = useState(null);


    // Delete
   

    const [selectedItem, setSelectedItem] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

 
    // Search
    

    function handleSearch(value) {

        setSearch(value);

        setPage(1);

    }

   
    // Sort


    function handleSort(field) {

        if (ordering === field) {

            setOrdering(`-${field}`);

        }

        else if (ordering === `-${field}`) {

            setOrdering("");

        }

        else {

            setOrdering(field);

        }

        setPage(1);

    }

   
    // Edit
   

    function startEdit(item) {

        setEditingItem(item);

    }

    function stopEdit() {

        setEditingItem(null);

    }

   
    // Delete
  

    function openDelete(item) {

        setSelectedItem(item);

        setIsDeleteModalOpen(true);

    }

    function closeDelete() {

        setSelectedItem(null);

        setIsDeleteModalOpen(false);

    }

    return {

        // Search

        search,

        setSearch,

        handleSearch,

        // Pagination

        page,

        setPage,

        // Sorting

        ordering,

        setOrdering,

        handleSort,

        // Edit

        editingItem,

        setEditingItem,

        startEdit,

        stopEdit,

        // Delete

        selectedItem,

        isDeleteModalOpen,

        openDelete,

        closeDelete

    };

}

export default useCrud;