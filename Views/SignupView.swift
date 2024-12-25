import SwiftUI

struct SignupView: View {
    @Binding var isLoggedIn: Bool
    @Environment(\.presentationMode) var presentationMode
    
    @State private var username = ""
    @State private var password = ""
    @State private var troopNumber = ""
    @State private var troopState = ""
    @State private var troopCity = ""
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Account Information")) {
                    TextField("Username", text: $username)
                    SecureField("Password", text: $password)
                }
                
                Section(header: Text("Troop Information")) {
                    TextField("Troop Number", text: $troopNumber)
                    TextField("State", text: $troopState)
                    TextField("City", text: $troopCity)
                }
                
                Section {
                    Button(action: signup) {
                        Text("Sign Up")
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color(hex: "ec8e13"))
                            .cornerRadius(10)
                    }
                }
            }
            .navigationTitle("Sign Up")
            .navigationBarItems(leading: Button("Cancel") {
                presentationMode.wrappedValue.dismiss()
            })
        }
    }
    
    private func signup() {
        // Simulate signup
        isLoggedIn = true
        presentationMode.wrappedValue.dismiss()
    }
}