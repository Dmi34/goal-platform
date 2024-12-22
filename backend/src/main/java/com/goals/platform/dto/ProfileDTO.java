package com.goals.platform.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDTO {
    private Long id;
    private String bio;
    private String phoneNumber;
    private String address;
    private String email;
    private UserDTO user;
    public UserDTO getUser() {
           return user;
       }

       public void setUser(UserDTO user) {
           this.user = user;
       }
    private UserSettingsDTO userSettings;
}
