import SwiftUI

struct LoginView: View {
    @Binding var isLoggedIn: Bool
    @State private var username = ""
    @State private var password = ""
    @State private var troopNumber = ""
    @State private var showingSignup = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Image("scout-logo")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 100)
                
                Text("Scout Chat")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(Color(hex: "ec8e13"))
                
                VStack(spacing: 15) {
                    TextField("Username", text: $username)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    SecureField("Password", text: $password)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    TextField("Troop Number", text: $troopNumber)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                }
                .padding(.horizontal)
                
                Button(action: login) {
                    Text("Login")
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color(hex: "ec8e13"))
                        .cornerRadius(10)
                }
                .padding(.horizontal)
                
                Button(action: { showingSignup.toggle() }) {
                    Text("Don't have an account? Sign up")
                        .foregroundColor(Color(hex: "99784D"))
                }
            }
            .padding()
            .sheet(isPresented: $showingSignup) {
                SignupView(isLoggedIn: $isLoggedIn)
            }
        }
    }
    
    private func login() {
        // Simulate login
        isLoggedIn = true
    }
}