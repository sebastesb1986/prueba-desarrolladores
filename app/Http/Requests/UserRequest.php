<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

     /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ];
        return $rules;
    }

    public function attributes()
    {
        return [

            'name'=> 'Nombre',
            'email' => 'Correo electrónico',
            'password'=> 'Contraseña',

        ];
    }

    public function messages()
    {

        return [

            'name.required'=> 'El nombre de usuario es requerido',
            'email.required' => 'Digite correo electrónico',
            'email.unique' => 'El correo electrónico ya se encuentra registrado',
            'email.email' => 'Correo electrónico no valido',
            'password.required' => 'Digite contraseña',
            'password.min' => 'La contraseña contiene minimo 6 caracteres',
            'password.confirmed' => 'Las contraseñas no coinciden',

        ];
    }

    public function failedValidation(Validator $validator) {
        // Pasamos en json los errores del request
       throw new HttpResponseException(response()->json(['errors' => $validator->errors()], 422));
   }
}
