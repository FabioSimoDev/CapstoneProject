package simonelli.fabio.CapstoneProject.payloads;

public record UpdateExistingUserDTO(

        String name,
        String surname,
        String username,
        String email,
        String password,
        String phoneNumber) {
}
