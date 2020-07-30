import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
const { Option } = Select;
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
    pets: [
      {
        id: "id1",
        name: "cat",
      },
      {
        id: "id2",
        name: "dog",
      },
      {
        id: "id3",
        name: "parrot",
      },
    ],
    id1: {
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

  const petName = (id) => {
    let pet = formData.pets.filter((pet) => pet.id === id);
    return pet[0].name;
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
    obj.pet = selectedPet;
    obj.questions = [];
    obj.appointmentNotes = values.appointmentNotes;
    selectedPet.map((petId) =>
      formData[petId]?.questions.map((q) => {
        let temp = {};
        temp.id = petId;
        temp[q.fieldName] = values[`${q.fieldName}-${petId}`];
        obj.questions.push(temp);
      })
    );
    console.log(obj);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="pet"
        label="pet"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select your pet"
          onChange={onGenderChange}
          allowClear
        >
          {formData.pets.map((pet) => (
            <Option value={pet.id}>{pet.name}</Option>
          ))}
        </Select>
      </Form.Item>
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
  );
};

export default DynamicForm;
