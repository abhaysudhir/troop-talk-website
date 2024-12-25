import SwiftUI

struct Message: Identifiable {
    let id = UUID()
    let content: String
    let sender: MessageSender
}

enum MessageSender {
    case user
    case ai
}

struct ChatView: View {
    @State private var messages: [Message] = []
    @State private var messageText = ""
    
    var body: some View {
        VStack(spacing: 0) {
            // Header
            VStack(spacing: 4) {
                HStack {
                    Image("scout-logo")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 40)
                    
                    VStack(alignment: .leading) {
                        Text("Troop 125")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(Color(hex: "ec8e13"))
                        
                        Text("Scout Chat Assistant")
                            .font(.subheadline)
                            .foregroundColor(Color(hex: "99784D"))
                    }
                    Spacer()
                }
                .padding()
            }
            .background(Color.white)
            .shadow(radius: 1)
            
            // Messages
            ScrollView {
                LazyVStack(spacing: 12) {
                    ForEach(messages) { message in
                        MessageBubble(message: message)
                    }
                }
                .padding()
            }
            
            // Input
            HStack {
                TextField("Type your message...", text: $messageText)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(Color(hex: "99784D"), lineWidth: 1)
                    )
                
                Button(action: sendMessage) {
                    Image(systemName: "paperplane.fill")
                        .foregroundColor(.white)
                        .padding(10)
                        .background(Color(hex: "ec8e13"))
                        .clipShape(Circle())
                }
            }
            .padding()
            .background(Color.white)
        }
        .background(Color(UIColor.systemGray6))
    }
    
    private func sendMessage() {
        guard !messageText.isEmpty else { return }
        
        let newMessage = Message(content: messageText, sender: .user)
        messages.append(newMessage)
        messageText = ""
        
        // Simulate AI response
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            let aiResponse = Message(
                content: "Thank you for your message. How can I help you with your scouting journey today?",
                sender: .ai
            )
            messages.append(aiResponse)
        }
    }
}

struct MessageBubble: View {
    let message: Message
    
    var body: some View {
        HStack {
            if message.sender == .user { Spacer() }
            
            Text(message.content)
                .padding()
                .background(message.sender == .user ? Color(hex: "ec8e13") : Color.white)
                .foregroundColor(message.sender == .user ? .white : .black)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(message.sender == .ai ? Color(hex: "99784D") : Color.clear, lineWidth: 1)
                )
                .frame(maxWidth: UIScreen.main.bounds.width * 0.8, alignment: message.sender == .user ? .trailing : .leading)
            
            if message.sender == .ai { Spacer() }
        }
    }
}