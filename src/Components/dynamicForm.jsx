import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import Card from "./cards";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const DynamicForm = () => {
  const [form] = Form.useForm();
  const [selectedPet, setSelectedPet] = useState([]);
  const [questionFields, setQuestionFields] = useState([]);
  const [formData, setFormData] = useState({
    id1: {
      id: "id1",
      name: "cat",
      avatar:
        "https://images.unsplash.com/photo-1552933529-e359b2477252?ixlib=rb-1.2.1&w=1000&q=80",
      questions: [
        {
          fieldName: "name",
          question: "what is name of your pet",
        },
        {
          fieldName: "age",
          question: "what is the age of your pet",
        },
      ],
    },
    id2: {
      id: "id2",
      name: "dog",
      avatar: "https://i.ytimg.com/vi/7xh1DAKIdng/maxresdefault.jpg",
      questions: [
        {
          fieldName: "name",
          question: "what is name of your pet",
        },
        {
          fieldName: "age",
          question: "what is the age of your pet",
        },
        {
          fieldName: "birthday",
          question: "when is the birthday of your pet",
        },
      ],
    },
    id3: {
      id: "id3",
      name: "parrot",
      avatar:
        "https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Indian-Ring-Necked-Parakeet.jpg",
      questions: [
        {
          fieldName: "name",
          question: "what is name of your pet",
        },
        {
          fieldName: "birthday",
          question: "when is the birthday of your pet",
        },
      ],
    },
  });

  const showFormFields = (selectedPet) => {
    let questionFields = [];
    if (selectedPet.length > 0) {
      selectedPet.map((pet) => {
        questionFields.push(<h3>{petName(pet)} questions</h3>);
        return formData[pet]?.questions.map((q) =>
          questionFields.push(
            <>
              <Form.Item
                name={`${q.fieldName}-${pet}`}
                label={q.question}
                rules={[
                  { required: true, message: `${q.fieldName} is required` },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )
        );
      });
      setQuestionFields(questionFields);
    } else {
      setQuestionFields([]);
    }
  };

  const handlePetCards = (id) => {
    if (selectedPet.length > 0) {
      const pet = selectedPet.findIndex((pet) => pet === id);
      if (pet === -1) {
        selectedPet.push(id);
        setSelectedPet(selectedPet);
        showFormFields(selectedPet);
      } else {
        let filterPet = selectedPet.filter((pet) => pet !== id);
        setSelectedPet(filterPet);
        showFormFields(filterPet);
      }
    } else {
      selectedPet.push(id);
      setSelectedPet(selectedPet);
      showFormFields(selectedPet);
    }
  };
  const petName = (id) => {
    return formData[id].name;
  };
  const onGenderChange = (value) => {
    let questionFields = [];
    if (value.length > 0) {
      value.map((pet) => {
        questionFields.push(<h3>{petName(pet)} questions</h3>);
        return formData[pet]?.questions.map((q) =>
          questionFields.push(
            <>
              <Form.Item
                name={`${q.fieldName}-${pet}`}
                label={q.question}
                rules={[
                  { required: true, message: `${q.fieldName} is required` },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )
        );
      });
    }
    setQuestionFields(questionFields);
    setSelectedPet(value);
  };

  const onFinish = (values) => {
    let obj = {};
    obj.appointmentNotes = values.appointmentNotes;
    selectedPet.map((petId) => {
      obj[petId] = {};
      obj[petId].questions = [];
      return formData[petId]?.questions.map((q) => {
        let temp = {};
        temp.id = petId;
        temp[q.fieldName] = values[`${q.fieldName}-${petId}`];
        obj[petId].questions.push(temp);
      });
    });
    console.log(obj);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {Object.keys(formData).map((pet) => (
        <Card
          handlePetCards={handlePetCards}
          key={formData[pet]?.id}
          url={formData[pet]?.avatar}
          name={formData[pet]?.name}
          id={formData[pet]?.id}
        />
      ))}
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        {questionFields}
        <Form.Item name="appointmentNotes" label="Additional Notes">
          <Input.TextArea />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DynamicForm;
