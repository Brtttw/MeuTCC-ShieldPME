package br.com.shieldpme.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/** DTOs de autenticacao/cadastro. O cadastro publico NAO aceita papel: sempre cria CLIENT. */
public final class AuthDtos {
    private AuthDtos() {}

    public record RegisterClientRequest(
            @NotBlank(message = "Informe o nome da empresa.") @Size(max = 150) String companyName,
            @NotBlank(message = "Informe o CNPJ.") @Size(max = 18) String cnpj,
            @NotBlank(message = "Informe o e-mail.") @Email(message = "E-mail inválido.") @Size(max = 100) String email,
            @NotBlank(message = "Informe a senha.") @Size(min = 8, max = 72, message = "A senha deve ter de 8 a 72 caracteres.") String password,
            @Pattern(regexp = "^$|^[0-9()+\\-\\s]{8,20}$", message = "Telefone inválido.") String phone) {}

    public record SessionUser(Integer id, String email, String role, String companyName) {}

    public record LoginResponse(String token, long expiresInSeconds, SessionUser user) {}

    public record MessageResponse(String message) {}
}
