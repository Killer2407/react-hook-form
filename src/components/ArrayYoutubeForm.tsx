import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

// let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  }
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
}
export const ArrayYoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
        username: "Batman",
        email: "",
        channel: "",
        social: {
            twitter: "",
            facebook: ""
        },
        phoneNumbers: ["", ""],
        phNumbers: [{number: ''}],
        age: 0,
        dob: new Date(),
    },
    mode: "onSubmit",
  })
  const { register, control, handleSubmit, formState, watch, getValues, setValue, reset, trigger } = form
  const { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount } = formState;

  console.log({touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount})

  const {fields, append, remove} = useFieldArray({
    name: "phNumbers",
    control
  })
  const onSubmit = (data: FormValues) => {
    console.log('Form Submission', data)
  }
  // renderCount++

//   const watchUsername = watch(["username", "email"]);
    useEffect(() =>{
        const subscription = watch((value) =>{
            console.log(value)
        })
        //cleanup function
        return () => subscription.unsubscribe();
    },[watch])

    const handleGetValues = () => {
        console.log("Get values", getValues("social"))
    }

    const handleSetValues = () => {
        setValue("username", "", {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log(errors)
    }

    useEffect(() => {
        if(isSubmitSuccessful) {
            reset();
        }
    },[isSubmitSuccessful])

  return (
    <div>
      {/* <h2>Youtube Form {renderCount / 2}</h2> */}
      <h1>Youtube Form</h1>
      <h2> Watched value</h2>
      <form onClick={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">

          <label htmlFor='username'>Username</label>
          <input type="text" id="username" placeholder='username' {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            }
          })} />
          <p className="errors">{errors.username?.message}</p>
        </div>


        <div className="form-control">
          <label htmlFor='email'>Email</label>
          <input type="text" id="email" {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid Email Format"
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                )
              },
              notBlackListed: (fieldValue) => {
                return(
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported."
                )
              }
            }
          })} placeholder='email' />
          <p className="errors">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor='channel'>Channel</label>
          <input type="text" id="channel" {...register("channel", { required: "Channel is required" })} placeholder='channel' />
          <p className="errors">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor='twitter'>Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter", {disabled: watch("channel")=== "", required: "Enter Twitter Profile" })} placeholder='twitter' />
        </div>

        <div className="form-control">
          <label htmlFor='facebook'>Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook", {disabled: watch("channel") === "", required: "Enter Facebook Profile "})} placeholder='facebook' />
        </div>

        <div className="form-control">
          <label htmlFor='primary-phone'>Primary Phone Number</label>
          <input type="text" id="primary-phone" {...register("phoneNumbers.0")} placeholder='primary-phone' />
        </div>

        <div className="form-control">
          <label htmlFor='secondary-phone'>Secondary Phone Number</label>
          <input type="text" id="secondary-phone" {...register("phoneNumbers.1")} placeholder='secondary-phone' />
        </div>

        <div className="form-control">
          <label>Lists of Phone Numbers</label>
          <div>
            {fields.map((field, index) => {
               return (
                <div className="form-control" key= {field.id}>
                    <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                    {
                        index > 0 && (
                            <button type='button' onClick={() => remove(index)}>Remove</button>
                        )
                    }
                </div> 
                )
            })}
            <button type='button' onClick={() => append({number: ""})}>Add a Number</button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor='age'>Age</label>
          <input type="number" id="age" {...register("age", {valueAsNumber: true, required: {value: true, message: "Age is required"}})} placeholder='age' />
          <p className="errors">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor='dob'>Date of Birth</label>
          <input type="date" id="dob" {...register("dob", {valueAsDate: true, required: {value: true, message: "Dob is required"}})} placeholder='dob' />
          <p className="errors">{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid || !isSubmitting}>Submit</button>
        <button type="button" onClick={()=>reset()}>Reset</button>
        <button type="button" onClick={handleGetValues}>Get Values</button>
        <button type="button" onClick={()=>trigger("channel")}>Validate</button>

        <button type="button" onClick={handleSetValues}>Set Values</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
