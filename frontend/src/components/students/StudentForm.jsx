import { useState, useEffect } from "react";
import FormActions from "../ui/FormActions/FormActions";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select/Select";

import useFetch from "../../hooks/useFetch";

import {
    createStudent,
    updateStudent
} from "../../services/studentService";

import {
    getTeachers
} from "../../services/teacherService";

function StudentForm({

    onStudentAdded,

    editingStudent,

    setEditingStudent

}) {

    const [formData, setFormData] = useState({

        name: "",

        age: "",

        teacher: ""

    });

    const [loading, setLoading] = useState(false);

   
    // Load Teachers
    

    const {

        data: teacherData

    } = useFetch(getTeachers);

    
    // Fill Form While Editing
   

    useEffect(() => {

        if (editingStudent) {

            setFormData({

                name: editingStudent.name,

                age: editingStudent.age,

                teacher: editingStudent.teacher

            });

        }

    }, [editingStudent]);

    
    // Handle Input Change
  

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    
    // Submit
 

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {

                ...formData,

                age: Number(formData.age),

                teacher: Number(formData.teacher)

            };

            if (editingStudent) {

                await updateStudent(

                    editingStudent.id,

                    payload

                );

                alert("Student Updated Successfully");

                setEditingStudent(null);

            }

            else {

                await createStudent(payload);

                alert("Student Created Successfully");

            }

            setFormData({

                name: "",

                age: "",

                teacher: ""

            });

            onStudentAdded();

        }

        catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <Card>

            <h2>

                {

                    editingStudent

                        ? "Update Student"

                        : "Add Student"

                }

            </h2>

            <form onSubmit={handleSubmit}>

                <Input

                    label="Student Name"

                    name="name"

                    value={formData.name}

                    onChange={handleChange}

                    placeholder="Enter student name"

                />

                <Input

                    label="Age"

                    name="age"

                    type="number"

                    value={formData.age}

                    onChange={handleChange}

                    placeholder="Enter age"

                />

                <Select

                    label="Teacher"

                    value={formData.teacher}

                    onChange={(e) =>

                        setFormData({

                            ...formData,

                            teacher: e.target.value

                        })

                    }

                    defaultOption="Select Teacher"

                    options={

                        teacherData?.results

                            ? teacherData.results.map((teacher) => ({

                                value: teacher.id,

                                label: teacher.name

                            }))

                            : teacherData?.map((teacher) => ({

                                value: teacher.id,

                                label: teacher.name

                            })) || []

                    }

                />

                <FormActions

                             isEditing={!!editingStudent}

                            onCancel={() => setEditingStudent(null)}

                />

            </form>

        </Card>

    );

}

export default StudentForm;