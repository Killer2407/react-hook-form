import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
}
export const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log('Form Submission', data)
  }
  // renderCount++

  return (
    <div>
      {/* <h2>Youtube Form {renderCount / 2}</h2> */}
      <h2>Youtube Form</h2>
      <form onClick={handleSubmit(onSubmit)} noValidate>
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

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}
