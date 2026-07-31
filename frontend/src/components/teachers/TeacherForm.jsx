import { useEffect, useState } from "react";
import FormActions from "../ui/FormActions/FormActions";
import Card from "../ui/Card";
import Input from "../ui/Input";


import {

    createTeacher,

    updateTeacher

} from "../../services/teacherService";

function TeacherForm({

    editingTeacher,

    setEditingTeacher,

    onTeacherAdded

}) {

    const [formData, setFormData] = useState({

        name: "",

        subject: ""

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (editingTeacher) {

            setFormData({

                name: editingTeacher.name,

                subject: editingTeacher.subject

            });

        }

    }, [editingTeacher]);

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            if (editingTeacher) {

                await updateTeacher(

                    editingTeacher.id,

                    formData

                );

                alert("Teacher Updated Successfully");

                setEditingTeacher(null);

            }

            else {

                await createTeacher(formData);

                alert("Teacher Created Successfully");

            }

            setFormData({

                name: "",

                subject: ""

            });

            onTeacherAdded();

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

                    editingTeacher

                        ? "Update Teacher"

                        : "Add Teacher"

                }

            </h2>

            <form onSubmit={handleSubmit}>

                <Input

                    label="Teacher Name"

                    name="name"

                    value={formData.name}

                    onChange={handleChange}

                />

                <Input

                    label="Subject"

                    name="subject"

                    value={formData.subject}

                    onChange={handleChange}

                />

              <FormActions

                      isEditing={!!editingTeacher}

                         onCancel={() => setEditingTeacher(null)}

                />
            </form>

        </Card>

    );

}

export default TeacherForm;